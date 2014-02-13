"use strict";

var template = require("./template.jade");
var pageTitle = require("./pageTitle");

template({ youAreUsingJadeReactify: "yes you are using" }, document.body);