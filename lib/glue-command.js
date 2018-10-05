/**
 * Supported commands
 */
var argumentList = require('./arguments.js');
var _ = require("lodash");

/**
 * The glue executable name
 * @type {string}
 */
var GLUE_EXECUTABLE = "glue";

var OPTIONAL_VALUE_ARGUMENTS = [
    'caat',
    'html',
    'json',
    'less',
    'scss',
    'cocos2d'
];

/**
 * Converts the options to commands that glue supports
 * @param {Object} opt
 * @constructor
 */
var GlueCommand = function(opt) {
    // clone the options
    var options = opt;

    /**
     * Returns the options that was alterend on build
     */
    this.getOptions = function() {
        return options;
    };

    /**
     * The final arguments
     * @type {Array}
     */
    var args = null;

    /**
     * Was options validated?
     * @type {boolean}
     */
    var validated = false;


    /**
     * Checks if the options was validated
     * @returns {boolean}
     */
    this.isValidated = function() {
        return validated;
    };

    /**
     * Make a reference to this object
     * @type {GlueCommand}
     */
    var that = this;

    /**
     * Validates the ooptions
     *
     * @throws
     */
    this.validate = function() {

        if (typeof options.exec === "undefined") {
            throw "The glue execution is not set";
        }

        // check if the

        if (options.exec != GLUE_EXECUTABLE && options.exec.indexOf(GLUE_EXECUTABLE) > -1 == false) {
            throw "The glue execution is not valide. Must contain the glue";
        }

        if (typeof options.source === "undefined") {
            throw "The source directory not defined";
        }

        if (typeof options.output === "undefined") {
            throw "The output directory not defined";
        }

        validated = true;
    };

    /**
     * Builds the arguments in the array
     *
     * @return {Array}
     */
    function createArguments() {
        if (!validated) {
            that.validate();
        }

        var opts = _.clone(options);

        /**
         * Build the basic arguments
         * @type Array
         */
        var args = [];

        // remove the exec from the option
        delete opts.exec;
        delete opts.progress;

        // add position sensitive arguments

        addArgument("source", args, opts);
        addArgument("output", args, opts);

        // loop the options

        for (var key in opts) {
            var value = parseOption(key, opts[key], argumentList);

            if (value != null) {
                args.push(value);
            }
        }

        return args;
    }

    /**
     * Parsers the options
     * @param {string} key
     * @param {Array} options
     * @param {Object} commands
     * @returns {string|XML|null}
     */
    function parseOption(key, value, commands) {
        var command = commands[key];
        
        // check if we support the command
        if (typeof command === "undefined") {
            throw "Option not supported: "+key;
        }
        
        // if the value is true, lets pass the command without value format
        if (value === true) {
            return command;
        } else if (value !== false) { // support the false values to skip settings
            
            // check if the arguments supports bool and optinally a custom value
            if (OPTIONAL_VALUE_ARGUMENTS.indexOf(key) > -1) {
                // add the value keyword
                command += "=%val%";
            }

            // add a value to the command
            return command.replace("%val%", value);
        } else {
            return null;
        }
    }

    /**
     * Adds a command value and removes it from options
     * @param {string} argument desired argument
     * @param {Array} arguments the list of current arguments
     * @param {Object} options the options
     */
    function addArgument(argument, arguments, options) {
        arguments.push(options[argument]);

        // delete from options
        delete options[argument];
    }

    /**
     * Returns generated command
     * @returns {Array}
     */
    this.getArguments = function () {
        if (args == null) {
            args = createArguments();
        }

        return args;
    }

    /**
     * Returns the command
     * @returns {string|string|*|string|string}
     */
    this.getCommand = function() {
        if (!validated) {
            that.validate();
        }

        return options.exec;
    }
};

module.exports = GlueCommand;
