var Glue = require("./lib/glue.js");

// Load the exec to enable running the glue command
var child_process = require('child_process');

/**
 * The glue webpack plugin
 * @param options
 * @constructor
 */
function GlueWebpackPlugin(options) {
    // create the glue
    this.glue = new Glue(options, child_process.spawn);

    // validate basic options
    this.glue.validate();
}

/**
 * Handle the webpack apply
 * @param compiler
 */
GlueWebpackPlugin.prototype.apply = function(compiler) {
    var that = this;

    // wait for emit
    compiler.plugin("compile", function(compilation, callback) {

        that.glue.compile(function(code) {
            callback();
        });
    });
};

module.exports = GlueWebpackPlugin;