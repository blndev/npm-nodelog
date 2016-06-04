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
var nodelog = {
    global: {
        logLevel: logLevels.warning,
    },
    console: {},
    default: {
        color: {}
    }
};

//flag which helps to detect an existing initialization
nodelog.console.ExtensionsInitialized = false;

module.exports = function (options, enableConsole) {
    options = options || {};

    //for performance we analyze strings only if they are given
    if (options.level) {
        //default log level is warning
        options.level = options.level || 'debug';
        //for the first call we have to analyze the string :-/
        switch (options.level.toLowerCase()) {
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
            if (options.logLevel != nodelog.default.logLevel)
                options.logLevel = logLevels.debug;
        }
    }
    options.logLevel = options.logLevel || nodelog.global.logLevel;
    //copy back, because its the new default for later instances
    nodelog.global.logLevel = options.logLevel;


    //set default colors.
    nodelog.default.color.log = nodelog.default.color.log || function (args) {
        return args;
    };
    nodelog.default.color.debug = nodelog.default.color.log;
    nodelog.default.color.info = nodelog.default.color.info || clc.magenta;
    nodelog.default.color.warn = nodelog.default.color.warn || clc.yellow;
    nodelog.default.color.error = nodelog.default.color.error || clc.red;
    nodelog.default.color.important = nodelog.default.color.important || clc.white;

    //todo p2: copy from globale default
    if (!options.color) {
        //simple, just use te default
        options.color = options.color || nodelog.default.color;
    } else {
        //some colors are specified by the user
        options.color.log = options.color.log || fnodelog.default.color.log;
        options.color.debug = options.color.log;
        options.color.info = options.color.info || nodelog.default.color.info;
        options.color.warn = options.color.warn || nodelog.default.color.warn;
        options.color.error = options.color.error || nodelog.default.color.error;
    }
    //set default prefix
    //use options, if hat is not set a configured global, 
    //if that is not set use our defualt
    options.prefix = options.prefix || nodelog.global.prefix || function (logType) {
        if (logType) logType = '(' + logType + ')\t';
        else logType = '';
        return logType + new Date().toISOString();
    };

    //if there is no public prefix, use the configured one
    nodelog.global.prefix = nodelog.global.prefix || options.prefix;

    //save the options to public if they are not there
    //TODO P2: use option by option
    nodelog.default = nodelog.default || options;

    //initialization
    (function () {

        if (nodelog.console.ExtensionsInitialized) return;

        if (options.logLevel <= logLevels.debug)
            console.log("initialize logger");

        if (enableConsole) {
            if (options.logLevel <= logLevels.debug)
                console.log("initialize console.log extension");
            nodelog.console.ExtensionsInitialized = true;
            ['log', 'info', 'warn', 'error'].forEach(function (logType) {
                var org = console[logType].bind(console);
                console[logType] = function () {

                    //analyze og levels
                    if (logLevels[logType] < nodelog.global.logLevel) return;

                    arguments[0] = options.color[logType](nodelog.global.prefix(logType)) + ' - ' + arguments[0];
                    org.apply(console, arguments);
                };
            });
        }
    }());

    var log = {
        options1: options,

        //publish loglevels on log object
        logLevels: logLevels,
        //in the case that console.log should not be modified, we support log....() funcitons with colors

        setPrefix: function (func) {
            options.prefix = func;
            //if (!nodelog.console.ExtensionsInitialized)
            nodelog.global.prefix = func;
        },

        //TODO P1: Set LogLevel + SetColors

        writeLine: function (logType, args) {
            //fallback for unknown logTypes
            if (!options.color[logType]) logType = 'debug';
            if (logLevels[logType] < options.logLevel) return;

            //we have to set the colors here if the console command is not modified
            if (!nodelog.console.ExtensionsInitialized) {
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
        },
        important: function () {
            arguments[0] = nodelog.default.color.important(' --> ' +
                arguments[0] + ' <--');
            console.log.apply(console, arguments);
        }
    };
    return log;
};