'use strict';
var log = require('./index.js')({
    logLevel: 'log'
});

console.log(log);

log.init();
log.init();
log.init();
console.log(log);

console.log('simple log');
console.info('simple info');
console.warn('simple warning');
console.error('simple error');