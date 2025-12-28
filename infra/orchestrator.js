// import retry from "async-retry"
const retry = require("async-retry")

const retryConfig = {
	retries: 100,
	minTimeout: 1000,
	maxTimeout: 60000,
	factor: 1.2
}

//  ---
async function waitForServices() {
	await waitForHttpServer()

	async function waitForHttpServer() {
		await retry(checkStatusAvailability, retryConfig)

		async function checkStatusAvailability() {
			const res = await fetch(`${process.env.APP_URL}/api/v1/status`)

			if (!res.ok) {
				throw Error(`HTTP ERROR, STATUS ${res.status}`)
			}
		}
	}
}

export default {
	waitForServices
}
