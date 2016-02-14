#!/usr/bin/env bash

set -e # abort on the first error

TSC=`npm bin`/tsc
MOCHA=`npm bin`/mocha

for f in tests/*.proto
do
	fileName=${f%.*}
	
	# Convert the prototype file
	echo "Running pbjs $f"
	./node_modules/protobufjs/bin/pbjs $f > $fileName.json

	# Start the program (it should work)
	echo "Running command.js $fileName.json"
	echo "/// <reference path=\"../definitions/bytebuffer.d.ts\" />" > $fileName.d.ts
	echo "/// <reference path=\"../definitions/long.d.ts\" />" >> $fileName.d.ts
	node command.js -f $fileName.json >> $fileName.d.ts

	# Run the TypeScript compiler and let see if it's ok
	echo "Running tsc $fileName.d.ts"
	$TSC -out /dev/null $fileName.d.ts
done

echo "Conversion OK"

# The compilation is a part of the tests
$TSC tests.ts --module commonjs
echo "Compilation OK"

# Run the unit tests
echo "Running mocha tests"
$MOCHA tests.js
