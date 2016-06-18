/*jslint node: true */
'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains

//sourcecode to test
var source = '../index.js';

describe('log levels', function () {

    var log;
    before(function () {
        log = require(source)();
    });

    describe('set log level',
        function () {
            it('shoud change the log level for current instance', function () {
                var currentLevel = log.getLogLevel();
                expect(currentLevel).to.be.oneOf([
                    log.logLevels.debug,
                    log.logLevels.error,
                    log.logLevels.info,
                    log.logLevels.warn
                    ], 'current has to be a part of logLevels');
                log.setLogLevel(log.logLevels.debug);
                expect(log.getLogLevel()).to.be.equal(log.logLevels.debug);
            });
        });

    describe('our instance', function () {
        it('should contain the defined log interface functions', function () {
            assert.isDefined(log.logLevels, 'loglevels are not available');

            assert.isFunction(log.debug, 'log.debug is not available');
            assert.isFunction(log.info, 'log.info is not available');
            assert.isFunction(log.warning, 'log.warning is not available');
            assert.isFunction(log.error, 'log.error is not available');
            assert.isFunction(log.important, 'log.important is not available');
        });

        it('should have default logLevel warning', function () {
            var inst = require(source)({
                useDefault: true
            });
            expect(inst.getLogLevel()).to.be.equal(inst.logLevels.warning);
        });

        describe('log.logLevels', function () {
            it('should contains all specified logLevels', function () {
                expect(log.logLevels).to.include.keys('debug', 'info', 'warning', 'warn', 'error');
            });

            it('should not be modifiable', function () {
                expect(log.logLevels).to.be.frozen;
            });
        });


    });

});
