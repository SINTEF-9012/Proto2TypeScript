#!/usr/bin/env bash

set -e # abort on the first error

for f in tests/*.proto
do
	fileName=${f%.*}
	
	# Convert the prototype file
	./node_modules/protobufjs/bin/proto2js $f > $fileName.json

	# Start the program (it should work)
	echo "/// <reference path=\"../definitions/bytebuffer.d.ts\" />" > $fileName.d.ts
	node command.js -f $fileName.json >> $fileName.d.ts

	# Run the TypeScript compiler and let see if it's ok
	tsc -out /dev/null $fileName.d.ts
done

echo "Conversion OK"

# The compilation is a part of the tests
tsc tests.ts --module commonjs
echo "Compilation OK"

# Run the unit tests
echo "Running mocha tests"
mocha tests.js
