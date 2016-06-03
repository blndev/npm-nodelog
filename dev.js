'use strict';
require('./index.js');
var log = require('./index.js')({
    logLevel: 'all'
});

log.info('hello info %s and %s', 'here', 'there');
log.error('simple error');
log.warning('simple warning');
log.debug('simple debug');

//console.log('log object:', log);
console.log('configured level', log.options.logLevel)

console.log('simple log');
console.info('simple info');
console.warn('simple warning');
console.error('simple error');

log.options.prefix = function () {
    return 'sample';
}

var clc = require('cli-color');
log.options.color.log = clc.blue;
console.log('simple log');
console.info('simple info');
console.warn('simple warning');
console.error('simple error');




//disable the console manipulation
var log = require('./index.js')({
    logLevel: 'all'
}, true);