const nextJest = require("next/jest.js")

// Configurations Relative Next-Jest Integrations
// (Including .env hierarchy files reading - test only)
const createJestConfig = nextJest({
	dir: "."
})

// Configurations Relative Jest-Only
const jestConfig = createJestConfig({
	modulePaths: ["node_modules", "<rootDir>"],
	setupFilesAfterEnv: ["./jest.setup.js"]
})

module.exports = jestConfig
