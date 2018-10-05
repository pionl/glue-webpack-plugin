'use strict';

// Get default optionss
var opts = require('../config.js');

// Enable building the glue comamnds
var Command = require("./glue-command.js");

// Enable merging options
var _ = require('lodash');

/**
 * The glue executioner
 * @param options
 * @param execa
 * @constructor
 */
var Glue = function (options, execa) {

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
     * @return {Promise}
     */
    this.compile = function () {
        var args = commandGenerator.getArguments();
        var cmd = commandGenerator.getCommand();

        // spawn the child
        return execa(cmd, args)
    };
}

module.exports = Glue;
