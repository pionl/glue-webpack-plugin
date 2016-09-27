var assert = require('power-assert');
var Plugin = require('../index.js');

describe("glue-plugin", function () {

    beforeEach(function () {

    });

    it("create", function() {
        var createPlugin = function() {
            var plugin = new Plugin();
        };

        assert.doesNotThrow(createPlugin);
    });

    it("create - invalid option", function() {
        var createPlugin = function() {
            var plugin = new Plugin({
                exec: "test"
            });
        };

        assert.throws(createPlugin);
    });

    it("compile", function() {

        // filystems
        var filesystem = require('fs');

        // try to remove the build folder
        try {
            filesystem.unlinkSync("tests/build/");
        } catch (e) {

        }

        var plugin = new Plugin({
            output: "tests/build",
            source: "tests/images"
        });

        var Compiler = function() {
            this.plugin = function(name, callback) {

                // the apply must call the mit function
                assert.equal(name, "compile");

                // test that the callback was called
                var called = false;
                var checkTimeout;

                callback("test", function() {
                    called = true;

                    clearTimeout(checkTimeout);

                    assert.doesNotThrow(function() {
                        filesystem.accessSync("tests/build/images.css", filesystem.F_OK);
                    }, "The images file should exists!");

                    assert.doesNotThrow(function() {
                        filesystem.accessSync("tests/build/images.png", filesystem.F_OK);
                    }, "The images file should exists!");
                });

                // wait until ts fully writter

                checkTimeout = setTimeout(function() {
                    assert.ok(called, "the callback must be called");
                }, 4000);
            };
        };

        plugin.apply(new Compiler());
    });
});
