var Glue = require("./lib/glue.js");

// Load the exec to enable running the glue command
var execa = require('execa');

/**
 * The glue webpack plugin
 * @param options
 * @constructor
 */
function GlueWebpackPlugin(options) {
    // create the glue
    this.glue = new Glue(options, execa);

    // validate basic options
    this.glue.validate();
}

/**
 * Handle the webpack apply
 * @param compiler
 */
GlueWebpackPlugin.prototype.apply = function(compiler) {
    var that = this;

    // start on compile (emit or compilation is triggered multiple times)
    compiler.plugin("emit", function(compilation, callback) {
        that.glue.compile().then(function (result) {
            if (options.progress) {
                process.stdout.write(result.stdout)
            }
            callback()
        }).catch(function (error) {
            compilation.errors.push(error)
            callback()
        });
    });
};

module.exports = GlueWebpackPlugin;
