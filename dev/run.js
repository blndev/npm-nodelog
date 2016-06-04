/*
  this file can be used by developers to test the functionality of the module
  execute with node dev/run.js

*/
'use strict';
//helper to switch the color later on
var clc = require('cli-color');

//load nodelog
var log = require('../index.js')({
    level: 'error'
}, false);

function writeLogs() {
    console.log('dev console log');
    console.info('dev console info');
    console.warn('dev console warning');
    console.error('dev console error');

    log.info('dev log info');
    log.error('dev log error');
    log.warning('dev log warning');
    log.debug('dev log debug');
}


writeLogs();

//log.options.logLevel = log.logLevels.warn;
//console.log('configured loglevel', log.options.logLevel)

writeLogs();

//log.options.logLevel = log.logLevels.debug;
//console.log('configured loglevel', log.options.logLevel)

console.info(clc.white('change prefix (local / default) to "sample"'));
log.important('change prefix (local / default) to "sample"');

log.setPrefix(function () {
    return 'sample';
});

log.options1.color.log = clc.blue;
writeLogs();

console.info(clc.white('load second file'));
require('./second.js');
console.info(clc.white('after second file'));

writeLogs();

console.info(clc.white('require nodelog again, with console'));
//disable the console manipulation
/*var log = require('../index.js')({
    level: 'warn'
}, true);
*/
writeLogs();