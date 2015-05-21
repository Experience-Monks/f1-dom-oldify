var ieVersion = require('ie-version');

module.exports = function(propertyStyle, propertyData, item, data) {
  
  var colour = data[ propertyData ];

  // if this is an array then apply
  if(Object.prototype.toString.call(colour).indexOf('Array') > -1) {

    var style;
    var rounded = colour.map(Math.round);

    if(colour.length == 3) {
      style = getHex(colour);
    } else if(colour.length == 4) {
      // we want alpha to be not rounded
      rounded[ 3 ] = colour[ 3 ];

      if(hasRGBASupport()) {
        style = 'rgba(' + rounded.join(',') + ')';  
      } else {
        style = getHex(colour);
      }
    } else {
      throw new Error('unsupported ' + propertyData + ' of type', colour);
    }

    console.log(style);
    item.style[ propertyStyle ] = style;
  }
};

function hasRGBASupport() {
  
  return ieVersion.version > 9;
}

function getHex(colour) {

  var r = colour[ 0 ];
  var g = colour[ 1 ];
  var b = colour[ 2 ];
  var hex = (
    r << 16 |
    g << 8 |
    b
  ).toString(16);

  while(hex.length < 6) {
    hex = '0' + hex;
  }

  return '#' + hex;
}