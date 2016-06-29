'use strict';

// Load the exec to enable running the glue command
var child_process = require('child_process');

// Get default optionss
var opts = require('../config.js');

// Enable building the glue comamnds
var Command = require("./glue-command.js");

// Enable merging options
var _ = require('lodash');

/**
 * The glue executioner
 * @param options
 * @param exec
 * @constructor
 */
var Glue = function (options, exec) {

    // import the options
    this.options = {};
    _.defaults(this.options, options, opts);

    // create the command generator
    var commandGenerator = new Command(this.options);


    /**
     * Checks if the basic options are valid
     */
    this.validate = function () {
        // validate the options
        commandGenerator.validate();
    };

    /**
     * Compiles the images
     */
    this.compile = function (callback) {
        var args = commandGenerator.getArguments();
        var cmd = commandGenerator.getCommand();

        // spawn the child
        var child = child_process.spawn(cmd, args);

        // pass the data
        child.stdout.on('data', function(data) {
            process.stdout.write(data);
        });
        
        child.on('error', function () {
            throw "Glue: Failed to start child.";
        });

        if (callback) {
            
            child.on('done', function() {
                callback();
            });
        }
    };
}

module.exports = Glue;