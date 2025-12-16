const nextJest = require("next/jest.js");
const dotenv = require("dotenv");

if (process.env.NODE_ENV == "test") {
	dotenv.config({ path: ".env.development" });
}

const createJestConfig = nextJest({});
const jestConfig = createJestConfig({
	moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
