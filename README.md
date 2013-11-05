Proto2TypeScript
================

This tool generate TypeScript definitions for your Protocol Buffers models, when you use the excellent [ProtoBuf.js](https://github.com/dcodeIO/ProtoBuf.js/) library.

It's a Node.js project, but a web demo is coming.

### Usage
```sh
# Install the dependencies
npm install

# Parse and convert the proto file to json using proto2js (from ProtoBuf.js)
node_modules/protobufjs/bin/proto2js model.proto > model.json

# Convert the model to TypeScript definitions
node command.js --file model.json > model.d.ts
```

### Options
```
Options:
  -f, --file              The JSON file                                       [required]
  -c, --camelCaseGetSet   Generate getter and setters in camel case notation  [default: true]
  -u, --underscoreGetSet  Generate getter and setters in underscore notation  [default: false]
  -p, --properties        Generate properties                                 [default: true]
```

### Acknowledgements

This code is developed in context of the [BRIDGE](http://www.bridgeproject.eu/en) project.

### Licence

The source code of this tool is licenced under the MIT License.
