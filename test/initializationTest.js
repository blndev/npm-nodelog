/*jslint node: true */
'use strict';
var chai = require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains
var source = '../index.js';

describe('initialization', function () {

    var log;
    before(function () {
        log = require(source)({
            useDefault: true
        });
    });

    describe('after calling require',
        function () {
            it('an instance should be created', function () {
                assert.isDefined(log);
            });
        });

    describe('a new instance', function () {

        it('should inherit changed loglevel', function () {

            var targetLevel = log.logLevels.debug;
            assert.notEqual(targetLevel, log.getLogLevel(), 'default loglevel is test loglevel, please change the test settings');

            log.setLogLevel(targetLevel);
            assert.equal(targetLevel, log.getLogLevel(), 'set and get loglevel failed');

            var log2 = require(source)();
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

            var log2 = require(source)();

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

        xit('should inherit changed colors', function () {

            var targetLevel = log.logLevels.debug;
            assert.notEqual(targetLevel, log.getLogLevel(), 'default loglevel is test loglevel, please change the test settings');

            log.setLogLevel(targetLevel);
            assert.equal(targetLevel, log.getLogLevel(), 'set and get loglevel failed');

            var log2 = require('../index.js')();
            assert.equal(targetLevel, log2.getLogLevel(), 'inherit loglevel failed, instance 2 has different level');
        });

    });
});
