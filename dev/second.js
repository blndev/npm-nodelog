'use strict';
//helper to switch the color later on
var clc = require('cli-color');

var log = require('../index.js')({
    level: 'all'
});

function writeLogs() {
    console.log('second console log');
    console.info('second console info');
    console.warn('second console warning');
    console.error('second console error');

    log.info('second log info');
    log.error('second log error');
    log.warning('second log warning');
    log.debug('second log debug');
}

writeLogs();
console.info(clc.white('change prefix to "abc"'));

log.setPrefix(function () {
    return 'abc';
});

writeLogs();

console.info(clc.white('change to "a####c"'));

log.setPrefix(function () {
    return 'a####c';
});

writeLogs();
