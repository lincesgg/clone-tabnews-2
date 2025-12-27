const nextJest = require("next/jest.js")

// Configurations Relative Next-Jest Integrations
// (Including .env hierarchy files reading - test only)
const createJestConfig = nextJest({
	dir: "."
})

// Injecting Dev ENV
const dotenv = require("dotenv")
dotenv.config({ path: "./.env.development" })

// Configurations Relative Jest-Only
const jestConfig = createJestConfig({
	modulePaths: ["node_modules", "<rootDir>"],
	// setupFilesAfterEnv: ["./jest.setup.js"],
	testTimeout: 60 * 1000
})

module.exports = jestConfig
