const { jestDirAlias } = require('./dirAlias');

module.exports = {
  collectCoverageFrom: [
    '**/(src|scripts)/**/*.{js,jsx}',
    '!**/src/testHelpers/**',
    '!**/*.stories.jsx',
  ],
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  moduleNameMapper: jestDirAlias,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
};
