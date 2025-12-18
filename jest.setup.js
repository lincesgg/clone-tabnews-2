if (process.env.NODE_ENV === "development") {
	const { loadEnvConfig } = require("@next/env")

	// load from "./" with dev=true
	loadEnvConfig("./", true)
}
