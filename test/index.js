var f1DomOldify = require('./..');
var supportedProps = require( '../supportedProps' );

var tests = [
  function opacity() {
    apply(getTestEl('opacity'), {
      alpha: 0.5
    });
  },

  function backgroundColor() {
    apply(getTestEl('backgroundColor'), {
      backgroundColor: [ 255, 0, 255, 0.1 ]
    });
  },

  function text() {
    apply(getTestEl('text'), {
      text: '<div>something</div>'
    });
  },

  function html() {
    apply(getTestEl('html'), {
      html: '<div>something</div>'
    });
  },

  function test2dPos() {
    apply(getTestEl('test2dPos'), {
      position: [100, 100]
    });
  },

  function test3dPos() {
    apply(getTestEl('test3dPos'), {
      perspective: 1000,
      position: [200, 100, -500]
    });
  },

  function test2dRotation() {
    apply(getTestEl('test2dRotation'), {
      rotation: [0, 0, Math.PI * 0.1]
    });
  },

  function test3dRotation() {
    apply(getTestEl('test3dRotation'), {
      rotation: [Math.PI * 0.25, Math.PI * 0.25, 0]
    });
  },

  function testTransformOrigin() {
    apply(getTestEl('testTransformOrigin'), {
      anchor: [0, 0, 0],
      rotation: [0, 0, Math.PI * 0.25]
    });
  },

  function testScale() {
    apply(getTestEl('testScale'), {
      scale: [0.5, 0.1, 1]
    });
  },

  function testCombined() {
    apply(getTestEl('testCombined'), {
      perspective: 1000,
      position: [100, 50, -900],
      rotation: [Math.PI * 0.1, Math.PI * 0.1, 0]
    });
  }
];

tests.forEach(function(test) {
  test();
});


function apply(el, testData) {
  f1DomOldify.forEach( function(func) {
    func(el, testData);
  });
}

function getTestEl(name) {

  var el = document.createElement('div');
  var parent = document.createElement('div');

  el.style.background = '#FF0000';
  el.style.width = el.style.height = '100px';

  parent.style.height = '200px';
  parent.style.position = 'relative';
  parent.style.border = '1px solid #000';
  parent.innerHTML = name;

  document.body.appendChild(parent);
  parent.appendChild(el);

  return el;
}