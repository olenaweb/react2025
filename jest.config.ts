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
  },
};
