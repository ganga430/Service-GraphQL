'use strict';

module.exports = {
  watchPathIgnorePatterns: ['node_modules'],
  transform: {
    '^.+\\.tsx?$': '@swc/jest'
  },
  collectCoverageFrom: [
    '**/{packages,services}/**/src/**/*.ts',
    '!**/{node_modules,testUtils,gql-types}/**',
    // Common schema is injected by Codegen, so we cannot directly reference these
    '!**/packages/gql-core/src/common-schema/**'
  ],
  reporters: [
    'default',
    'jest-github-actions-reporter',
    ['jest-junit', { outputDirectory: './reports', outputName: 'jest-junit.xml' }],
    ['jest-html-reporter', { outputPath: 'reports/jest-html.html' }]
  ],
  setupFilesAfterEnv: ['./setupTests.js']
};
