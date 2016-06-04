/*
  this file can be used by developers to test the functionality of the module
  execute with node dev/run.js

*/
'use strict';
require('../index.js');
var log = require('../index.js')({
    logLevel: 'all'
}, false);

//helper to switch the color later on
var clc = require('cli-color');

log.info('dev log info %s and %s', 'here', 'there');
log.error('dev log error');
log.warning('dev log warning');
log.debug('dev log debug');

//console.log('log object:', log);
console.log('configured loglevel', log.options.logLevel)

console.log('dev console log');
console.info('dev console info');
console.warn('dev console warning');
console.error('dev console error');

console.info(clc.white('change prefix to "sample"'));
log.options.prefix = function () {
    return 'sample';
}

log.options.color.log = clc.blue;
console.log('dev simple log');
console.info('dev simple info');
console.warn('dev simple warning');
console.error('dev simple error');

console.info(clc.white('load second file'));
require('./second.js');

console.info(clc.white('require nodelog again'));
//disable the console manipulation
var log = require('../index.js')({
    logLevel: 'all'
});

console.log('simple log');
console.info('simple info');
console.warn('simple warning');
console.error('simple error');