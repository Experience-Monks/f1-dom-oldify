window.Float32Array = window.Float32Array || Array;


if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}


if(!Array.isArray) {
  Array.isArray = function(array) {
    return Object.prototype.toString(array).indexOf('Array') > -1;
  };
}


if(window.console === undefined) {
  window.console = {};
  window.console.log = function() {};
}





var f1DomOldify = require('./..');
var test = require( 'tape' );
var supportedProps = require( '../supportedProps' );

var toApply = {

  color: [ 11, 22, 33, 0.5 ],
  backgroundColor: [ 22, 33, 44, 0.3 ],
  position: [ 500, 100, 200 ],
  scale: [ 0.5, 0.63, 0.8 ],
  rotation: [ 45, 0, 45 ],
  perspective: 200,
  anchor: [ 0.33, 0.8 ],
  alpha: 0.5
};

console.log('here');

test( 'check init', function( t ) {
  var el = getEL();

  applyParsers( el, toApply );

  t.equal( el.style.position, 'absolute', 'elements position is absolute' );

  t.end();
});

test( 'check supported props', function( t ) {

  t.deepEqual( supportedProps, {

    position: Array,
    scale: Array,
    rotation: Array,
    perspective: Number,
    anchor: Array,
    alpha: Number,
    text: String,
    html: String,
    color: Array,
    backgroundColor: Array
  }, 'supported props do not match' );

  t.end();
});

test( 'apply transform', function( t ) {

  var el = getEL();

  applyParsers( el, toApply );

  document.body.appendChild( el );

  t.equal( el.style.transform, 
          'matrix3d(0.262660980224609, 0.281608939170837, 0.579229474067688, 0, -0.425451755523682, 0.173856809735298, 0.357598662376404, 0, 0, -0.536069214344025, 0.420257598161697, -0.0500000007450581, 500, 100, 200, 1)',
          'transform correct' );

  t.end();
});

test( 'apply transform orgin', function( t ) {

  var el = getEL();

  applyParsers( el, toApply );

  document.body.appendChild( el );

  t.equal( el.style[ 'transform-origin' ], '33% 80% 0px', 'transform origin correct' );

  t.end();
});

test( 'apply opacity', function( t ) {

  var el = getEL();

  applyParsers( el, toApply );

  document.body.appendChild( el );

  t.equal( el.style.opacity, '0.5', 'transform origin correct' );

  t.end();
});

test( 'apply html', function( t ) {

  var el = getEL();

  applyParsers( el, { html: '<div>snakey snake</div>' } );

  t.equal( el.innerHTML, '<div>snakey snake</div>', 'html set correctly' );

  t.end();
});

test( 'apply text', function( t ) {

  var el = getEL();

  applyParsers( el, { text: '<div>snakey snake</div>' } );

  t.equal( el.innerHTML, '&lt;div&gt;snakey snake&lt;/div&gt;', 'text set correctly' );

  t.end();
});

test( 'apply color 4', function( t ) {

  // cannot use a real html element here since Webkit browser
  // Does something like Math.floor(0.5 * 255) / 255 internally
  // var el = getEL();
  var el = {
    style: {}
  };

  el.innerHTML = 'i should have colour set';
  applyParsers( el, toApply );
  applyParsers( el, toApply );

  t.equal( el.style.color, 'rgba(11,22,33,0.5)', 'color set correctly' );
  t.equal( el.style.backgroundColor, 'rgba(22,33,44,0.75)', 'background-color set correctly' );

  t.end();
});

function applyParsers(el, toApply) {
  f1DomOldify.forEach( function(parser) {
    parser(el, toApply);
  });
}

function getEL() {

  var el;

  try {
      el = document.createElement( 'div' );

      el.style.backgroundColor = '#CAFE00';
      el.style.width = el.style.height = '100px';
      document.body.appendChild(el);
  } catch(e) {

    el = {};
    el.style = {};
  }

  return el;
}