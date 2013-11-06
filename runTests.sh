#!/usr/bin/env bash

set -e # abort on the first error


for f in tests/*.proto
do
	fileName=${f%.*}
	
	# Convert the prototype file
	./node_modules/protobufjs/bin/proto2js $f > $fileName.json

	# Start the program (it should work)
	node command.js -f $fileName.json > $fileName.d.ts

	# Run the TypeScript compiler and let see if it's ok
	tsc -out /dev/null $fileName.d.ts

	# Run more tests in JavaScript
done


echo OK