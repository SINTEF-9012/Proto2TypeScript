/// <reference path="./definitions/node.d.ts" />
/// <reference path="./definitions/dustjs-linkedin.d.ts" />
var argv = require('optimist').usage('Convert a ProtoBuf.js JSON description in TypeScript definitions.\nUsage: $0').demand('f').alias('f', 'file').describe('f', 'The JSON file').boolean('c').alias('c', 'camelCaseGetSet').describe('c', 'Generate getter and setters in camel case notation').default('c', true).boolean('u').alias('u', 'underscoreGetSet').describe('u', 'Generate getter and setters in underscore notation').default('u', false).boolean('p').alias('p', 'properties').describe('p', 'Generate properties').default('p', true).argv;

// Import in typescript and commondjs style
var ProtoBuf = require("protobufjs");
var DustJS = require("dustjs-linkedin");
var fs = require("fs");

// Keep line breaks
DustJS.optimizers.format = function (ctx, node) {
    return node;
};

// Create view filters
DustJS.filters["firstLetterInUpperCase"] = function (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
    ;
};

DustJS.filters["firstLetterInLowerCase"] = function (value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
    ;
};

DustJS.filters["convertType"] = function (value) {
    switch (value.toLowerCase()) {
        case 'string':
            return 'string';
        case 'bool':
            return 'boolean';
        case 'bytes':
            // TODO check this
            return 'ArrayBuffer';
        case 'double':
        case 'float':
        case 'int32':
        case 'int64':
        case 'uint32':
        case 'uint64':
        case 'sint32':
        case 'sint64':
        case 'fixed32':
        case 'fixed64':
        case 'sfixed32':
        case 'sfixed64':
            return "number";
    }

    // By default, it's a message identifier
    return value;
};

DustJS.filters["optionalFieldDeclaration"] = function (value) {
    return value == "optional" ? "?" : "";
};

DustJS.filters["repeatedType"] = function (value) {
    return value == "repeated" ? "[]" : "";
};

function loadDustTemplate(name) {
    var template = fs.readFileSync("./templates/" + name + ".dust", "UTF8"), compiledTemplate = DustJS.compile(template, name);

    DustJS.loadSource(compiledTemplate);
}

// Generate the names for the model, the types, and the interfaces
function generateNames(model, prefix, name) {
    if (typeof name === "undefined") { name = ""; }
    model.fullPackageName = prefix + (name != "." ? name : "");

    // Copies the settings (I'm lazy)
    model.properties = argv.properties;
    model.camelCaseGetSet = argv.camelCaseGetSet;
    model.underscoreGetSet = argv.underscoreGetSet;

    var newDefinitions = {};

    for (var key in model.messages) {
        var message = model.messages[key];
        newDefinitions[message.name] = true;
        generateNames(message, prefix, "." + (model.name ? model.name : ""));
    }

    for (var key in model.enums) {
        var _enum = model.enums[key];
        newDefinitions[_enum.name] = true;
        _enum.fullPackageName = model.fullPackageName + (model.name ? "." + model.name : "");
    }

    for (var key in model.fields) {
        var field = model.fields[key];
        if (newDefinitions[field.type]) {
            field.type = model.name + "." + field.type;
        }
    }
}

// Load dust templates
loadDustTemplate("module");
loadDustTemplate("interface");
loadDustTemplate("enum");

// Load the json file
var model = JSON.parse(fs.readFileSync(argv.file).toString());

// Generates the names of the model
generateNames(model, model.package);

// Render the model
DustJS.render("module", model, function (err, out) {
    if (err != null) {
        console.error(err);
        process.exit(1);
    } else {
        console.log(out);
    }
});

