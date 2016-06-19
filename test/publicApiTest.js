'use strict';
var chai = chai || require('chai');
var assert = chai.assert; //http://chaijs.com/api/assert/
//var expect = chai.expect; //http://chaijs.com/api/bdd/#method_language-chains
var source = '../index.js';

describe('public api', function () {

    var log;
    before(function () {
        log = require(source)({
            useDefault: true
        });
    });

    describe('helper', function () {
        it('should contain logLevels enum', function () {
            assert.isDefined(log.logLevels, 'loglevels enum found');
            assert.isFrozen(log.logLevels, 'logLevels is not modifiable');
        });
    });

    describe('log functions', function () {
        it('should contain log.debug', function () {
            //TODO P4: check parameters if possible
            assert.isFunction(log.debug, 'log.debug is available');
        });
        it('should contain log.info', function () {
            //TODO P4: check parameters if possible
            assert.isFunction(log.info, 'log.info is available');
        });
        it('should contain log.warning', function () {
            //TODO P4: check parameters if possible
            assert.isFunction(log.warning, 'log.warning is available');
        });
        it('should contain log.error', function () {
            //TODO P4: check parameters if possible
            assert.isFunction(log.error, 'log.error is available');
        });
        it('should contain log.important', function () {
            //TODO P4: check parameters if possible
            assert.isFunction(log.important, 'log.important is available');
        });
    });

    describe('configuration functions', function () {
        it('should contain the documented public functions', function () {
            assert.isFunction(log.setColor, 'setColor is available');
            assert.isFunction(log.getColor, 'getColor is available');

            assert.isFunction(log.setPrefix, 'setPrefix is  available');
        });
    });

});
