/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./test/setup.ts"],
  testTimeout: 30000,
  cache: false,
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};
