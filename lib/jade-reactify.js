"use strict";

// this is the ugliest i've ever did
require( "../node_modules/jade-react/node_modules/coffee-script" );

var through = require( "through" );
var jadeReact = require( "jade-react" );

module.exports = function( fileName ){
    if( !( /\.jade$/i ).test( fileName ) ){
        return through();
    }

    var template = "";

    return through(
        function( chunk ){
            template += chunk;
        },
        function(){
            var compiled = jadeReact( template );

            var body = 'var React = require( "react" );\n\n' +
                       'module.exports = function( params, el ){\n'+
                       '  with( params ){\n' +
                       '    return React.renderComponent(' + compiled.trim() + ', el );\n' +
                       '  }\n' +
                       '};';
            this.queue(body);
            this.queue(null);
        }
    );
};