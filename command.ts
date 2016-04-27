#!/usr/bin/env node
/// <reference path="./definitions/node.d.ts" />
/// <reference path="./definitions/dustjs-helpers.d.ts" />

var argv = require('optimist')
	.usage('Convert a ProtoBuf.js JSON description in TypeScript definitions.\nUsage: $0')
    .demand('f')
    .alias('f', 'file')
    .describe('f', 'The JSON file')
    .boolean('c')
    .alias('c', 'camelCaseGetSet')
    .describe('c', 'Generate getter and setters in camel case notation')
    .default('c', true)
    .boolean('u')
    .alias('u', 'underscoreGetSet')
    .describe('u', 'Generate getter and setters in underscore notation')
    .default('u', false)
    .boolean('p')
    .alias('p', 'properties')
    .describe('p', 'Generate properties')
    .default('p', true)
	.boolean('camelCaseProperties')
    .describe('camelCaseProperties', 'Generate properties with camel case (either this or underscores - can’t be both)')
    .default('camelCaseProperties', false)
    .argv;


// Import in typescript and commondjs style
//var ProtoBuf = require("protobufjs");
import DustJS = require("dustjs-helpers");
import fs = require("fs");

// Keep line breaks
DustJS.optimizers.format = (ctx, node)=> node;


// Create view filters
DustJS.filters["firstLetterInUpperCase"] = (value : string)=> {
	return value.charAt(0).toUpperCase() + value.slice(1);
};

DustJS.filters["firstLetterInLowerCase"] = (value : string)=> {
	return value.charAt(0).toLowerCase() + value.slice(1);
};

DustJS.filters["camelCase"] = (value: string) => {
	return value.replace(/(_[a-zA-Z])/g, (match)=> match[1].toUpperCase());
};

DustJS.filters["convertType"] = (value : string)=> {
	switch (value.toLowerCase()) {
	case 'string':
		return 'string';
	case 'bool':
		return 'boolean';
	case 'bytes':
		return 'ByteBuffer';
	case 'double':
	case 'float':
	case 'int32':
	case 'uint32':
	case 'sint32':
	case 'fixed32':
	case 'sfixed32':
		return "number";
	case 'int64':
	case 'uint64':
	case 'sint64':
	case 'fixed64':
	case 'sfixed64':
		return "Long";
	}

	// By default, it's a message identifier
	return value;
};

DustJS.filters["optionalFieldDeclaration"] = (value : string)=> value == "optional" ? "?" : "";

DustJS.filters["repeatedType"] = (value : string)=> value == "repeated" ? "[]" : "";


function loadDustTemplate(name : string) : void {
	var template = fs.readFileSync(__dirname+"/templates/"+name+".dust", "UTF8").toString(),
		compiledTemplate = DustJS.compile(template, name);

	DustJS.loadSource(compiledTemplate);
}

// Generate the names for the model, the types, and the interfaces
function generateNames (model : any, prefix : string, name : string = "") : void{


	model.fullPackageName = prefix+(name != "." ? name : "");

	// Copies the settings (I'm lazy)
	model.properties = argv.properties;
	model.camelCaseProperties = argv.camelCaseProperties;
	model.camelCaseGetSet = argv.camelCaseGetSet;
	model.underscoreGetSet = argv.underscoreGetSet;

	var newDefinitions = {};

	// Generate names for messages
	// Recursive call for all messages
	var key;
	for (key in model.messages) {
		var message = model.messages[key];
		newDefinitions[message.name] = "Builder";
		generateNames(message,model.fullPackageName, "."+(model.name ? model.name : ""));
	}

	// Generate names for enums
	for (key in model.enums) {
		var currentEnum = model.enums[key];
		newDefinitions[currentEnum.name] = "";
		currentEnum.fullPackageName = model.fullPackageName + (model.name ? "."+model.name : "");
	}

	// For fields of types which are defined in the same message,
	// update the field type in consequence
	for (key in model.fields) {
		var field = model.fields[key];
		if (typeof newDefinitions[field.type] !== "undefined") {

			field.type = model.name + "." + field.type;
		}
	}
	
	model.oneofsArray = [];
	
	for (key in model.oneofs) {
		var oneof = model.oneofs[key];
		model.oneofsArray.push({name: key, value: oneof});
	}

	// Add the new definitions in the model for generate builders
	var definitions: any[] = [];
	for (key in newDefinitions) {
		definitions.push({name: key, type: ((model.name ? (model.name + ".") : "") + key)+newDefinitions[key]});
	}
	model.definitions = definitions;
}

// Load dust templates
loadDustTemplate("module");
loadDustTemplate("interface");
loadDustTemplate("enum");
loadDustTemplate("builder");

// Load the json file
var	model = JSON.parse(fs.readFileSync(argv.file).toString());

// If a packagename isn't present, use a default package name
if (!model.package) {
	model.package = "Proto2TypeScript";
}

// Generates the names of the model
generateNames(model, model.package);

// Render the model
DustJS.render("module", model, (err, out)=> {
	if (err != null) {
		console.error(err);
		process.exit(1);
	} else {
		console.log(out);
	}
});
