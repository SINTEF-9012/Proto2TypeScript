#!/usr/bin/env bash

for f in *.proto
do
	../node_modules/protobufjs/bin/proto2js $f > ${f=.*}.json
done