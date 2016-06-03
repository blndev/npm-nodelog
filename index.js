'use strict';
var clc = require("cli-color");

var logLevels = {
    'debug': 1,
    'info': 2,
    'warning': 3,
    'error': 4
};

module.exports = function (options) {
    options = options || {};

    //default log level is debug
    options.logLevel = options.logLevel || logLevels.debug;
    switch (options.logLevel.toLowerCase()) {
    case 'debug':
        options.logLevel = logLevels.debug;
        break;
    case 'info':
        options.logLevel = logLevels.info;
        break;
    case 'warning' || 'warn':
        options.logLevel = logLevels.warning;
        break;
    case 'error' || 'exception':
        options.logLevel = logLevels.error;
        break;
    }

    //set default colors
    options.color = options.color || {};
    options.color.log = function (args) {
        return args;
    };
    options.color.info = clc.magenta;
    options.color.warning = clc.yellow;
    options.color.error = clc.red;

    //set default prefix
    options.prefix = function () {
        return new Date().toISOString();
    };

    var initialized = false;
    var log = {


        init: function (nocolor) {
            if (this.initialized) return;
            console.log("initialize logger extension");
            this.initialized = true;

            var colorMap = {
                //no color for simple log
                log: function (args) {
                    return args;
                },
                //magenta for info messages
                info: clc.magenta,
                //yellow for warnings
                warn: clc.yellow,
                //red for errors
                error: clc.red
            };

        ['log', 'info', 'warn', 'error'].forEach(function (logType) {
                var org = console[logType].bind(console);
                console[logType] = function () {
                    //TODO P2: add additional log levels and usage
                    if (logType == 'log' && this.logLevel <= 1 /*this.logLevels.debug*/ ||
                        logType != 'log'
                    )
                        arguments[0] = colorMap[logType]((new Date().toISOString())) + ' - ' + arguments[0];

                    org.apply(console, arguments);
                };
            });
        },



        logLevel: 0,
        info: function () {
            //console.log(clc.blue(new Date().toISOString()) + ' ' + msg, arguments)
            //Array.prototype.unshift.call(arguments, clc.blue((new Date().toISOString())) + ' ' + arguments[0]);
            arguments[0] = clc.blue((new Date().toISOString())) + ' ' + arguments[0];
            console.log.apply(console, arguments);
        },
    };
    log.options = options;
    return log;
};