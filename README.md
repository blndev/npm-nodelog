nodelog
=======

[![Build Status](https://travis-ci.org/blndev/npm-nodelog.svg?branch=master)](https://travis-ci.org/blndev/npm-nodelog)
[![Coverage Status](https://coveralls.io/repos/github/blndev/npm-nodelog/badge.svg?branch=master)](https://coveralls.io/github/blndev/npm-nodelog?branch=master)
[![GitHub version](https://badge.fury.io/gh/blndev%2Fnpm-nodelog.svg)](https://badge.fury.io/gh/blndev%2Fnpm-nodelog)
[![Dependency Status](https://gemnasium.com/badges/github.com/blndev/npm-nodelog.svg)](https://gemnasium.com/github.com/blndev/npm-nodelog)
[![npm version](https://badge.fury.io/js/nodelog.svg)](https://badge.fury.io/js/nodelog)



[![NPM](https://nodei.co/npm/nodelog.png)](https://nodei.co/npm/nodelog/)

Nodelog is a very small and easy to use library which allows you to see colored log outut in the console and manage different log levels.
In addition is every log message enhanced with a preefix, which contains a timestamp by default.
If you activate it, then also the default _console.log_ calls are handled by this library.

The package is available via npm: 
https://www.npmjs.com/package/nodelog

Installation
------------
Use the node package manager to install this lib.

Enter in your console:

```bash
$ npm install nodelog --save-dev
```

LogLevel
--------
Supported LogLevels are:
* debug (verbose output for analyzing the program flow)
* info (nice to have informations for users of your source)
* warn (as the name say, a warning)
* error (a classical error/exception)

The default log level is _warning_

Configuration Properties
------------------------
For the color management we use cli-color.
You can define own colors or styles by setting the values on the constructor or via set Methods described later.

### Constructor Settings
Here all supported constructor options with sampel data:
```js
{ 
  level: 'all',
  color: 
   { 
     log: clc.black,
     debug: function(message) { return message;},
     info: clc.white,
     warn: clc.yellow
     error: clc.red.big
   },
  prefix: function(logType) { return ' -->' + logType + ' -->'; }
```

Samples
-------
We will provide a file called samples.js in our node_module folder.

### Log all Messages form your sources:
```js
var log = require("nodelog")({
    logLevel: 'all' //'debug' is also possible
});

//a debug output
log.debug('hello world');
//a error log
log.error('this is an error');
```

### Log messages via console.log
Log all Messages form your sources:
```js
var log = require("nodelog")({
    logLevel: 'debug'
}, true);

//debug output
log.debug('way one via log method');
console.log('way two via console.log');
//error log
log.error('error via log object')
console.error('error via console');
```

### Change the Prefix
```js
var log = require("nodelog")({
    logLevel: 'debug'
}, true);
log.setPrefix(function () {
    return 'sample';
});
console.log('this is a message via console.log');
```
The result is:

_sample - this is a message via console.log_

## You can try it Online:
https://tonicdev.com/575206f053e2371300d5ee50/575206f053e2371300d5ee51


## Known Issues
--no-color parameter is currently not supported