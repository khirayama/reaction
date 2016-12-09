const jsxTransform = require('jsx-transform');

function jsx(codes) {
  const code = codes[0];
  const result = jsxTransform.fromString(code, {
    factory: 'createElement',
    passUnknownTagsToFactory: 'createElement',
    arrayChildren: false,
  });
  return result;
}

module.exports = jsx;
