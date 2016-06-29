var Glue = require("./lib/glue.js");
var exec = require("exec");

/**
 * The glue webpack plugin
 * @param options
 * @constructor
 */
function GlueWebpackPlugin(options) {
    // create the glue
    this.glue = new Glue(options, exec);

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
    compiler.plugin("emit", function(compilation, callback) {

        that.glue.compile(function(code) {
            callback();
        });
    });
};

module.exports = GlueWebpackPlugin;