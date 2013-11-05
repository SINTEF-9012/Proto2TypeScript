/// <reference path="./definitions/node.d.ts" />
/// <reference path="./definitions/mocha.d.ts" />
/// <reference path="./definitions/expect.js.d.ts" />
/// <reference path="command.ts" />

import assert = require("assert");
var expect : (target?: any) => Expect.Root = require("expect.js");

describe("Initialization", function() {

	it('should be ok', function() {
		expect(1).to.be.ok();
	});

});