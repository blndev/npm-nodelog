'use strict';
var assert = require('chai').assert;
var clc = require('cli-color');

describe('log settings tests', function () {

    var log;
    before(function () {
        log = require('../index.js')();
    });

    describe('when modify colors',
        function () {
            it('then get should return the value created by set', function () {
                var testColor = clc.magenta;
                var level = log.logLevels.warn;
                assert.notEqual(log.getColor(level), testColor, 'color is not different to test value, modify test!');
                log.setColor(level, testColor);
                assert.equal(log.getColor(level), testColor, 'color is not modified');
            });
        });
});