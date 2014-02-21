/// <reference path="./definitions/node.d.ts" />
/// <reference path="./definitions/mocha.d.ts" />
/// <reference path="./definitions/expect.js.d.ts" />
/// <reference path="./tests/complete.d.ts" />

import assert = require("assert");

var expect: (target?: any) => Expect.Root = require("expect.js");
var ProtoBuf: any = require("protobufjs"); 

describe("Complete example", ()=> {

	var builder : LSTransmission.ProtoBufBuilder = 
		ProtoBuf.protoFromFile("./tests/complete.proto")
			.build("LSTransmission");

	describe("LatLng", ()=> {
		var latlng = new builder.LatLng();
		latlng.setLat(43.12345);
		latlng.setLng(5.98765);

		var buffer = latlng.toArrayBuffer();

		var latlng2 = builder.LatLng.decode(buffer);

		it("should contain the same values", ()=> {
			expect(latlng.getLat()).to.be.equal(latlng2.getLat());
			expect(latlng.getLng()).to.be.equal(latlng2.getLng());
		});
	});

	describe("AgeModel", ()=> {
		var age = new builder.AgeModel();
		age.Unit = "canard";

		var age2 = builder.AgeModel.decode(age.toArrayBuffer());

		it("should contain the same string", ()=> {
			expect(age2.Unit).to.be.equal(age.getUnit());
		});
	});

	describe("Dictionnary", ()=> {
		var helpbeacon = new builder.HelpBeaconModel();
		helpbeacon.HelpBeaconID = "abcd"; // required
		helpbeacon.setMessage("help");

		var entry1 = new builder.HelpBeaconModel.DictionaryEntry();
		entry1.key = "abc";
		entry1.value = "canard";
		var entry2 = new builder.HelpBeaconModel.DictionaryEntry();
		entry2.key = "test";
		entry2.value = "test";

		describe("Check the entries", ()=> {
			var entry1Check = builder.HelpBeaconModel.DictionaryEntry.decode(
				entry1.toArrayBuffer());

			it("should contain the same values", ()=> {
				expect(entry1Check.getKey()).to.be.equal(entry1.key);
				expect(entry1Check.value).to.be.equal(entry1.value);
			});
		});

		helpbeacon.DistributionDictionay.push(entry1);
		helpbeacon.DistributionDictionay.push(entry2);
		helpbeacon.DistributionDictionay.push(entry2);

		describe("Check the list", ()=> {
			var helpbeacon2 = builder.HelpBeaconModel.decode(
				helpbeacon.toArrayBuffer());

			it("should contain the same message", ()=> {
				expect(helpbeacon2.Message).to.be.equal(helpbeacon.Message);
			});

			it("Should be the same array's length", ()=> {
				expect(helpbeacon2.DistributionDictionay.length).to.be.equal(
					helpbeacon.DistributionDictionay.length);
			});

			it("The first element should have the correct key", ()=> {
				expect(helpbeacon2.DistributionDictionay.pop().getKey()).to.be.equal(
					helpbeacon.DistributionDictionay.pop().getKey());
			});
		});
	});

	describe("And check the enums", ()=> {
		var patient = new builder.PatientModel();
		patient.Id = "abcd";
		patient.TriageStatus = LSTransmission.PatientModel.TriageStatusEnum.GREEN;

		var patient2 = builder.PatientModel.decode(
			patient.toArrayBuffer());

		it("should be the same color", ()=> {
			expect(patient2.TriageStatus).to.be.equal(patient.TriageStatus);
		});
	});
});
