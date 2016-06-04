'use strict';
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