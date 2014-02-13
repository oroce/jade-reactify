var concat = require( "concat-stream" );
var browserify = require( "browserify" );
var jsdom = require( "jsdom" ).jsdom;
var jadeReactify = require( ".." );
var path = require( "path" );
var fs = require( "fs" );
function fixturePath(fileName) {
  return path.resolve(__dirname, "fixtures", fileName);
}

var bundleStream = browserify().transform( jadeReactify ).add( fixturePath( "entry.js" ) ).bundle();
var pageHtml = fs.readFileSync( fixturePath( "index.html" ), "utf8" );
var desiredOutput = fs.readFileSync( fixturePath( "desired-output.txt" ), "utf8" ).trim();

describe( "Testing browserify bundle", function(){

  it( "should transform jade to react", function( done ){
     bundleStream.pipe(concat(function (bundleJs) {
        var window = jsdom(pageHtml).parentWindow;

        var scriptEl = window.document.createElement("script");
        scriptEl.textContent = bundleJs;

        window.document.head.appendChild(scriptEl);

        window.document.body.innerHTML.should.match(/yes you are using/);

        done();
    }));
  });

})