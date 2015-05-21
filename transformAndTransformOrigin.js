var getTransformMatrix = require('f1-dom/lib/getTransformMatrix');
var ieCssTransform = require('ie-css-transform/fromMatrix');

module.exports = function transformAndTransformOrigin(item, data) {
  
  var transform = getTransformMatrix(data);
  var transformOrigin;
  var anchor;

  if( transform ) { 
    anchor = data.anchor || [ 0.5, 0.5 ];
    transformOrigin = Math.round( anchor[ 0 ] * 100 ) + '% ' + Math.round( anchor[ 1 ] * 100 ) + '%';

    ieCssTransform(item, transform, transformOrigin);
  }
};