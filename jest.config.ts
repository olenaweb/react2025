export default {
  preset: "ts-jest/presets/default",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.app.json" }],
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg|woff|woff2|ttf|eot)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/index.{js,jsx,ts,tsx}',
    '!src/setupTests.{js,ts}',
    '!src/**/*.d.ts',
    "!<rootDir>/node_modules/",
    "!<rootDir>/dist/",
    "!<rootDir>/"
  ],
  coverageThreshold: {
    "global": {
      "statements": 80,
      "branches": 50,
      "functions": 50,
      "lines": 50
    }
  },
  coverageReporters: [
    "text"
  ],

};
