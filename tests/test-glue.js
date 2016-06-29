var assert = require('power-assert');
var Glue = require('../lib/glue.js');
// Enable merging options
var _ = require('lodash');
/**
 * The config options
 */
var defaultOptions = require("../config.js");

/**
 * The test options
 * @type {{source: string, force: boolean}}
 */
var inputOptions = {
    source: "input",
    force: true
};


describe("glue", function () {
    /**
     * @type Glue
     */
    var glue;
    beforeEach(function () {
        glue = new Glue(inputOptions, function() {});
    });

    it("options merge", function () {
        // check if the values where merged
        assert.deepEqual(glue.options, {
            exec: defaultOptions.exec,
            source: inputOptions.source,
            output: defaultOptions.output,
            force: inputOptions.force
        });
    });

    it("validate", function() {
        assert.doesNotThrow(glue.validate, "The validate should not raise exception - there are valid options");
    });

    it("validate - error", function() {
        var glue = new Glue({
            exec: "test"
        });

        // check if the options are still different (the clone is working)
        assert.deepEqual(glue.options, {
            exec: "test",
            source: defaultOptions.source,
            output: defaultOptions.output
        });

        assert.throws(glue.validate, "The validate should raise exception - not valid options");
    });

    it("validate - compile error", function() {
        var glue = new Glue({
            forces: "forces"
        });

        assert.throws(glue.compile, "The validate should raise exception - not valid option");
    });

    it("validate - compile", function() {

        var called = false;
        var glue = new Glue({
            force: true
        }, function(cmd, args) {
            called = true;

            assert.equal(cmd, "glue");

            assert.deepEqual(args, [
                defaultOptions.source, defaultOptions.output, "--force"
            ]);

            // create the child object
            var child = function() {
                this.stdout = {
                    on: function(name, callback) {
                        assert.equal(name, "data");
                    }
                };

                this.on = function(name, callback) {

                };
            };

            return new child();
        });

        glue.compile();

        assert.ok(called);
    });
});