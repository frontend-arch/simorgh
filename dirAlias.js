const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  webpackDirAlias: {
    '#app': resolvePath('src/app'),
    '#contexts': resolvePath('src/app/contexts'),
    '#data': resolvePath('data/'),
    '#lib': resolvePath('src/app/lib/'),
    '#models': resolvePath('src/app/models/'),
    '#testHelpers': resolvePath('src/testHelpers/'),
    '#server': resolvePath('src/server/'),
  },
  jestDirAlias: {
    '^#app(.*)$': '<rootDir>/src/app$1',
    '^#contexts(.*)$': '<rootDir>/src/app/contexts$1',
    '^#data(.*)$': '<rootDir>/data$1',
    '^#lib(.*)$': '<rootDir>/src/app/lib$1',
    '^#models(.*)$': '<rootDir>/src/app/models$1',
    '^#testHelpers(.*)$': '<rootDir>/src/testHelpers$1',
    '^#server(.*)$': '<rootDir>/src/server$1',
  },
  eslintDirAlias: {
    map: [
      ['#app', './src/app'],
      ['#contexts', './src/app/contexts'],
      ['#data', './data'],
      ['#lib', './src/app/lib'],
      ['#models', './src/app/models'],
      ['#testHelpers', './src/testHelpers'],
      ['#server', './src/server'],
    ],
    extensions: ['.js', '.jsx', '.json'],
  },
};
