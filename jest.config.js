const nextJest = require("next/jest.js")

// Configurations Relative Next-Jest Integrations
const createJestConfig = nextJest({})

// Configurations Relative Jest-Only
const jestConfig = createJestConfig({
	modulePaths: ["node_modules", "<rootDir>"]
})

module.exports = jestConfig
