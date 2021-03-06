/*jslint node: true */
(function () {
    'use strict';
    var clc = require("cli-color");

    clc.nocolor = function (args) {
        return args;
    };
    //global nodelog configuration
    var nodelog = {
        logLevels: {
            'debug': 1,
            'log': 1, //to handle the logType easier
            'info': 2,
            'warn': 3,
            'warning': 3,
            'error': 4
        },
        global: {
            //default log level is warning
            logLevel: 3,
        },
        console: {
            ExtensionsInitialized: false
        },
        default: {
            color: {
                log: clc.nocolor,
                debug: clc.nocolor,
                info: clc.magenta,
                warn: clc.yellow,
                error: clc.red,
                important: clc.white
            }
        }
    };

    //flag which helps to detect an existing initialization
    //nodelog.console.ExtensionsInitialized = false;

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
                options.logLevel = nodelog.logLevels.debug;
                break;
            case 'info':
                options.logLevel = nodelog.logLevels.info;
                break;
            case 'warning':
            case 'warn':
                options.logLevel = nodelog.logLevels.warn;
                break;
            case 'error' || 'exception':
                options.logLevel = nodelog.logLevels.error;
                break;
            default:
                console.log('using default log level');
                if (options.logLevel != nodelog.default.logLevel) {
                    options.logLevel = nodelog.logLevels.debug;
                }
            }
        }
        options.logLevel = options.logLevel || nodelog.global.logLevel;
        //copy back, because its the new default for later instances
        nodelog.global.logLevel = options.logLevel;

        if (!options.color) {
            //simple, just use te default
            options.color = options.color || nodelog.default.color;
        } else {
            //some colors are specified by the user, so figure out which
            options.color.log = options.color.log || options.color.debug || nodelog.default.color.log || nodelog.default.color.log;
            options.color.debug = options.color.log;
            options.color.info = options.color.info || nodelog.default.color.info;
            options.color.warn = options.color.warn || nodelog.default.color.warn;
            options.color.error = options.color.error || nodelog.default.color.error;
            options.color.important = options.color.important || nodelog.default.color.importantx;
        }
        //set default prefix
        //use options, if hat is not set a configured global, 
        //if that is not set use our defualt
        options.prefix = options.prefix || nodelog.global.prefix || function (logType) {
            if (logType) {
                logType = '(' + logType + ')\t';
            } else {
                logType = '';
            }
            return logType + new Date().toISOString();
        };

        //if there is no public prefix, use the configured one
        nodelog.global.prefix = nodelog.global.prefix || options.prefix;

        //console.log(options);

        //save the options to public if they are not there
        nodelog.default = nodelog.default || options;

        //initialization
        (function () {

            if (nodelog.console.ExtensionsInitialized) {
                return;
            }

            /*
            if (options.logLevel <= nodelog.logLevels.debug) {
                console.log("initialize logger");
            }
            */

            if (enableConsole) {
                if (options.logLevel <= nodelog.logLevels.debug) {
                    console.log("initialize console.log extension");
                }

                nodelog.console.ExtensionsInitialized = true;
            ['log', 'info', 'warn', 'error'].forEach(function (logType) {
                    var org = console[logType].bind(console);
                    console[logType] = function () {

                        //analyze og levels
                        if (nodelog.logLevels[logType] < nodelog.global.logLevel) {
                            return;
                        }

                        arguments[0] = options.color[logType](nodelog.global.prefix(logType)) + ' - ' + arguments[0];
                        org.apply(console, arguments);
                    };
                });
            }
        }());


        var log = {
            //options: options,

            //publish loglevels on log object
            logLevels: nodelog.logLevels,
            //in the case that console.log should not be modified, we support log....() funcitons with colors

            /**           
             * set the log level for current instance and future instances           
             * @param {type} loglevel log.logLevels.debug etc.           
             */
            setLogLevel: function (loglevel) {
                //TODO P3 check for instance of loglevel object
                options.logLevel = loglevel;
                //save value for inheritance
                nodelog.global.logLevel = loglevel;
            },

            getLogLevel: function () {
                return options.logLevel;
            },

            setPrefix: function (func) {
                options.prefix = func;
                //if (!nodelog.console.ExtensionsInitialized)
                //save value for inheritance
                nodelog.global.prefix = func;
            },

            getPrefix: function () {
                return options.prefix;
            },

            setColor: function (loglevel, color) {
                options.color[loglevel] = color;
            },

            getColor: function (loglevel) {
                return options.color[loglevel];
            },

            writeLine: function (logType, args) {
                //fallback for unknown logTypes
                if (!options.color[logType]) {
                    logType = 'debug';
                }
                if (nodelog.logLevels[logType] < options.logLevel) {
                    return;
                }

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
})();