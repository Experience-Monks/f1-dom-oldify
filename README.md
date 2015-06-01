# f1-dom-oldify

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This module will take the f1-dom module and "oldify" it. For instance instead of running css 3d transforms it will emulate the same through ie filter operations on older versions of ie.

Known issues:

1. Webkit renders perspective transforms differently so visually some elements do not match 100%
2. Older ie browsers do not support perspective transformations so 3d rotations are mimiced through skews. This means rotations do not look correct but will look similar.
3. Older ie browsers do not support rgba background colours so alpha is currently bring ignored by f1-dom-oldify for colours.

## Usage

[![NPM](https://nodei.co/npm/f1-dom-oldify.png)](https://www.npmjs.com/package/f1-dom-oldify)

This module expects `f1-dom` to be a peer dependency so first do:
```
$ npm i f1-dom --save
$ npm i f1-dom-oldify --save
```

Then in your source code you have two options.

### Option #1 just require and use:
```javascript
var f1 = require('f1');
var f1DomOldify = require('f1-dom-oldify');

var ui = f1()
.parsers(f1DomOldify);
```
The above method is similar to using `f1-dom`.

### Option #2 oldify `f1-dom`:
```javascript
var f1 = require('f1');
var f1Dom = require('f1-dom');
require('f1-dom-oldify').oldify();

var ui = f1()
.parsers(f1Dom);
```
The above method will modify `f1-dom` to support older browsers. Most likely you'd perform a check that oldification should happen before doing it. For instance check if this is an old IE version then oldify.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/f1-dom-oldify/blob/master/LICENSE.md) for details.
