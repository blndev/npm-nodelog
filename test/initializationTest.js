/*jslint node: true */
'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains

describe('initialization tests', function () {

    var log, abc;
    before(function () {
        log = require('../index.js')();
    });

    describe('after calling require',
        function () {
            it('an instance should be created', function () {
                assert.isDefined(log);
            });
        });
    describe('our instance', function () {
        it('should contain the defined interface functions', function () {
            assert.isDefined(log.logLevels, 'loglevels are not available');

            assert.isFunction(log.setColor, 'setColor is not available');
            assert.isFunction(log.getColor, 'getColor is not available');

            assert.isFunction(log.setPrefix, 'setPrefix is not available');

            assert.isFunction(log.debug, 'log.debug is not available');
            assert.isFunction(log.info, 'log.info is not available');
            assert.isFunction(log.warning, 'log.warning is not available');
            assert.isFunction(log.error, 'log.error is not available');
            assert.isFunction(log.important, 'log.important is not available');

        });

        it('should contains all known logLevels', function () {
            expect(log.logLevels).to.include.keys('debug', 'info', 'warning', 'warn', 'error');
        });
    });

    describe('a new instance', function () {
        it('should inherit changed loglevel', function () {

            var targetLevel = log.logLevels.debug;
            assert.notEqual(targetLevel, log.getLogLevel(), 'default loglevel is test loglevel, please change the test settings');

            log.setLogLevel(targetLevel);
            assert.equal(targetLevel, log.getLogLevel(), 'set and get loglevel failed');

            var log2 = require('../index.js')();
            assert.equal(targetLevel, log2.getLogLevel(), 'inherit loglevel failed, instance 2 has different level');
        });

        it('should inherit changed prefixes', function () {

            var orgPrefix = log.getPrefix();

            var targetPrefix = function (level) {
                return level;
            };
            assert.notEqual(targetPrefix, log.getPrefix(), 'default prefix is equal to test prefix, please change the test settings');

            log.setPrefix(targetPrefix);
            assert.equal(targetPrefix, log.getPrefix(), 'set and get prefix failed');

            var log2 = require('../index.js')();

            //test that the inheterance is done and we did not use the function from level one
            log.setPrefix(function (level) {
                return 123;
            });

            //console.log(targetPrefix.toString());
            //console.log(log2.getPrefix().toString());
            //expect(log2.getPrefix).as.string.is.equals.to(targetPrefix).as.string;
            assert.equal(targetPrefix, log2.getPrefix(), 'inherit prefix failed, instance 2 has different prefix');

            //restore original
            log.setPrefix(orgPrefix);
        });
    });
});