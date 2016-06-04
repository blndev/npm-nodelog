'use strict';
var clc = require("cli-color");

var logLevels = {
    'debug': 1,
    'log': 1, //to handle the logType easier
    'info': 2,
    'warn': 3,
    'warning': 3,
    'error': 4
};

//global nodelog configuration
var nodelog = {};

//flag which helps to detect an existing initialization
nodelog.consoleExtensionsInitialized = false;

module.exports = function (options, disablecConsole) {
    options = options || {};
    if (nodelog.consoleExtensionsInitialized) {
        //if the console is already initialized, it is not possible to reset that
        disablecConsole = false;
    }
    //save the value because it has to be resued for all instances
    nodelog.disableConsole = disablecConsole;
    //default log level is debug
    options.logLevel = options.logLevel || '';
    //console.log('configured log level text:', options.logLevel.toLowerCase());
    switch (options.logLevel.toLowerCase()) {
    case 'all':
    case 'debug':
    case 'log':
    case 'verbose':
        options.logLevel = logLevels.debug;
        break;
    case 'info':
        options.logLevel = logLevels.info;
        break;
    case 'warning':
    case 'warn':
        options.logLevel = logLevels.warn;
        break;
    case 'error' || 'exception':
        options.logLevel = logLevels.error;
        break;
    default:
        console.log('using default log level');
        options.logLevel = logLevels.debug;
    }
    //console.log('using log level:', options.logLevel);

    //set default colors
    options.color = options.color || {};
    options.color.log = options.color.log || function (args) {
        return args;
    };
    options.color.debug = options.color.log;
    options.color.info = options.color.info || clc.magenta;
    options.color.warn = options.color.warn || clc.yellow;
    options.color.error = options.color.error || clc.red;

    //set default prefix
    options.prefix = options.prefix || function (logType) {
        if (logType) logType = '(' + logType + ')\t';
        else logType = '';
        return logType + new Date().toISOString();
    };

    //initialization
    (function () {

        if (nodelog.consoleExtensionsInitialized) return;

        if (options.logLevel <= logLevels.debug)
            console.log("initialize logger");

        if (!disablecConsole) {
            if (options.logLevel <= logLevels.debug)
                console.log("initialize console.log extension");
            nodelog.consoleExtensionsInitialized = true;
            ['log', 'info', 'warn', 'error'].forEach(function (logType) {
                var org = console[logType].bind(console);
                console[logType] = function () {
                    if (logLevels[logType] < options.logLevel) return;

                    arguments[0] = options.color[logType](options.prefix(logType)) + ' - ' + arguments[0];
                    org.apply(console, arguments);
                };
            });
        }
    }());

    var log = {
        options: options,
        //in the case that console.log should not be modified, we support log....() funcitons with colors

        writeLine: function (logType, args) {
            //fallback for unknown logTypes
            if (!options.color[logType]) logType = 'debug';
            //we have to set the colors here if the console command is not modified
            if (nodelog.disableConsole) {
                args[0] = options.color[logType](options.prefix(logType)) + ' - ' + args[0];
            }
            switch (logType) {
            case 'info':
                console.info.apply(console, args);
                break;
            case 'warn':
                console.warn.apply(console, args);
                break;
            case 'error':
                console.error.apply(console, args);
                break;
            default:
                console.log.apply(console, args);
            }
        },
        debug: function () {
            this.writeLine('debug', arguments);
        },
        info: function () {
            this.writeLine('info', arguments);
        },
        warning: function () {
            this.writeLine('warn', arguments);
        },
        error: function () {
            this.writeLine('error', arguments);
        }
    };
    return log;
};