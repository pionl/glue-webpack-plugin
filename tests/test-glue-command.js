var assert = require('power-assert');
var expect = require('chai').expect;

var Command = require("../lib/glue-command.js");

/**
 * A quick way to create a getArguments test
 * @param message
 * @param options
 * @param errorMessage
 */
function testCommandsException(message, options, errorMessage) {
    it('getArguments - test exception ' + message, function () {
        var command = new Command(options);

        expect(function () {
            command.getArguments();
        }).to.throw(errorMessage);
    });
}

var basicOptions = {
    exec: "glue",
    source: "input",
    output: "output",
};

describe("glue-command", function () {
    beforeEach(function () {

    });

    testCommandsException("exec", {}, "The glue execution is not set");
    testCommandsException("exec variant", {
        exec: "no_"
    }, "The glue execution is not valide. Must contain the glue");

    testCommandsException("source", {
        exec: "./glue"
    }, "The source directory not defined");

    testCommandsException("output", {
        exec: "./glue",
        source: "test/"
    }, "The output directory not defined");

    it("getArguments - was validated", function () {
        var command = new Command(basicOptions);

        assert.ok(!command.isValidated(), "The options souhldnt be validated");
        assert.doesNotThrow(command.getArguments, "The commands should not raise any aditional error");
        assert.ok(command.isValidated(), "The options souhld be validated");
    });

    it("getArguments - basic array list", function () {
        var command = new Command(basicOptions);

        assert.deepEqual(command.getArguments(), [
            "input", "output"
        ]);

        // ensure the options are same
        assert.deepEqual(command.getOptions(), basicOptions);
    });

    it("getArguments - commands", function () {
        var command = new Command({
            exec: "glue",
            source: "input",
            output: "output",
            force: true,
            less: true,
            project: false
        });

        assert.equal("glue", command.getCommand());
        assert.deepEqual(command.getArguments(), [
            "input", "output", "--force", "--less"
        ]);
    });

    it("getArguments - unknown option", function () {
        var command = new Command({
            exec: "glue",
            source: "input",
            output: "output",
            forces: true
        });

        // check if the throw is created
        expect(function () {
            command.getArguments();
        }).to.throw("Option not supported: force");
    });
});