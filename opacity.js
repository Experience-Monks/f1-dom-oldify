var ieVersion = require('ie-version').version;
var f1DomOpacity = require('f1-dom/opacity');

module.exports = function opacity(item, data) {

  var alpha;

  if(data.alpha !== undefined) {

    alpha = Math.round( data.alpha * 100 );

    // is not ie
    if(ieVersion === null) {

      f1DomOpacity(item, data);
    // ie 8
    } else if(ieVersion >= 8) {

      console.log('BEFORE ALPHA', item.style.filter);

      if(!item.filters['DXImageTransform.Microsoft.Alpha']) {
        item.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + alpha + ')' + (item.style.filter ? ' ' + item.style.filter : '' );  
      }

      item.filters['DXImageTransform.Microsoft.Alpha'].Opacity = alpha;
    // older ie
    } else {

      item.style.filter = (item.style.filter ? '' : ' ' ) + 'alpha(opacity=' + alpha + ')';  
    }
  }
};