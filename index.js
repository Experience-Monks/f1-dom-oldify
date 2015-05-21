var f1Dom = require('f1-dom');
var f1DomTransform = require('f1-dom/transform');
var f1DomTransformOrigin = require('f1-dom/transformOrigin');
var f1DomColor = require('f1-dom/color');
var f1DomBackgroundColor = require('f1-dom/backgroundColor');
var oldTransform = require('./transformAndTransformOrigin');
var oldColor = require('./color');
var oldBackgroundColor = require('./backgroundColor');


var oldified = [];

// translate
// scale
// rotate
// opacity
// transformOrigin

f1Dom.forEach( function(func) {

  switch(func) {
    case f1DomTransform:
      oldified.push(oldTransform);
    break;

    // this will be handled by then old transform
    case f1DomTransformOrigin:
    break;

    case f1DomColor:
      oldified.push(oldColor);
    break;

    case f1DomBackgroundColor:
      oldified.push(oldBackgroundColor);
    break;

    default:
      oldified.push(func);
    break;
  }
});

// the oldify function will modify all f1-dom calls to be oldified
oldified.oldify = function() {
  f1Dom.length = 0;

  oldified.forEach( function(func) {
    f1Dom.push(func);
  });
};

module.exports = oldified;