'use strict';
var assert = require('chai').assert;

describe('default config values', function () {

    var log, abc;
    before(function () {
        log = require('../index.js')();
        abc = global.nodelog;
    });

    describe('initialization',
        function () {
            it('log should be defined', function () {
                assert.isDefined(log);
            });
        });
    describe('log', function () {
        it('should have colors defined', function () {
            //console.log(log);
            assert.isDefined(log.options, 'options are not available');
            //assert.isFunction(log.options.color.debug, 'debug is not available');
            assert.isFunction(log.options.color.log, 'log is not available');
            assert.isFunction(log.options.color.info, 'info is not available');
            assert.isFunction(log.options.color.warn, 'warn is not available');
            assert.isFunction(log.options.color.error, 'error is not available');
        });
    });
    describe('nodelog', function () {
        it('should have default colors', function () {
            assert.isDefined(abc, 'nodelog is not defined');
            assert.isDefined(nodelog.default, 'default section in nodelog is not defined');
            assert.isFunction(nodelog.default.color.debug, 'debug is not available');
            assert.isFunction(nodelog.default.color.log, 'log is not available');
            assert.isFunction(nodelog.default.color.info, 'info is not available');
            assert.isFunction(nodelog.default.color.warn, 'warn is not available');
            assert.isFunction(nodelog.default.color.error, 'error is not available');
        });
    });
});