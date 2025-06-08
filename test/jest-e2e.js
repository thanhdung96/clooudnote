module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@common/(.*)$": "<rootDir>/src/common/$1",
    "^@healthcheck/(.*)$": "<rootDir>/src/healthcheck/$1",
    "^@notes/(.*)$": "<rootDir>/src/notes/$1",
    "^@securities/(.*)$": "<rootDir>/src/securities/$1",
    "^@tags/(.*)$": "<rootDir>/src/tags/$1",
    "^@users/(.*)$": "<rootDir>/src/users/$1"
  },
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
