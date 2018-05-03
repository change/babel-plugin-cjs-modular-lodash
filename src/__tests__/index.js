const fs = require('fs');
const path = require('path');
const { transform } = require('babel-core');
const plugin = require('../index');

function transformFixture(fixturePath, options) {
  return transform(
    fs.readFileSync(path.join(__dirname, '../../support/fixtures', fixturePath)),
    Object.assign(
      {
        babelrc: false,
        plugins: [[plugin, {}]],
      },
      options
    )
  ).code;
}

test('Transforms calls on global _ properties to modular requires', () => {
  expect(transformFixture('global.js')).toMatchSnapshot();
});

test('Transforms methods in files with a monolithic require and removes monolithic require', () => {
  expect(transformFixture('monolithic_require.js')).toMatchSnapshot();
});

test('Transforms deconstructured assignment correctly', () => {
  expect(transformFixture('deconstruction.js', { presets: [['es2015', { modules: false }]] })).toMatchSnapshot();
});
