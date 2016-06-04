'use strict';
//helper to switch the color later on
var clc = require('cli-color');

var log = require('../index.js')({
    logLevel: 'all'
}, true);


console.log('second console log');
console.info('second console info');
console.warn('second console warning');
console.error('second console error');

log.info('second log info %s and %s', 'here', 'there');
log.error('second log error');
log.warning('second log warning');
log.debug('second log debug');

console.info(clc.white('change prefix to "abc"'));

log.options.prefix = function () {
    return 'abc';
}

console.log('second console log');
console.info('second console info');
console.warn('second console warning');
console.error('second console error');

log.info('second log info');
log.error('second log error');
log.warning('second log warning');
log.debug('second log debug');