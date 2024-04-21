// jest.config.js
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"], // Use SWC for JavaScript and TypeScript files
  },
  testEnvironment: "jsdom", // Required for React testing
};
