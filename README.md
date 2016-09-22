Proto2TypeScript
================

This tool generate TypeScript definitions for your Protocol Buffers models, when you use the excellent [ProtoBuf.js](https://github.com/dcodeIO/ProtoBuf.js/) library.

### Usage
```sh
# Install the dependencies
npm install --production

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
  -t, --templateDir       Template directory                                  [default: __dirname]
```

### Why ?

Because intelligent code completion is cool :-)

![](http://i.imgur.com/evVnEM5.png "Example in sublime text")

### Requirements

It is a Node.js project. The sourcecode is written in TypeScript, but the JavaScript output is present in the repository.

If you want  to run the tests, you need bash, mocha and typescript.

### Acknowledgements

This code is developed in context of the [BRIDGE](http://www.bridgeproject.eu/en) project.

### Licence

The source code of this tool is licenced under the MIT License.
