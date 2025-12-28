const { exec } = require("node:child_process")
const retry = require("async-retry")

waitForDB()

async function waitForDB() {
	let firstIt = true
	await retry(
		isDatabaseAvailable,
		{
			retries: 150,
			minTimeout: 200,
			maxTimeout: 2500,
			factor: 1.05,
			onRetry: (err) => {
				if (firstIt) {
					process.stdout.write("\n🔴 Database Unavailable, ⌛ Waiting for Availability ")
					firstIt = false
				}
				process.stdout.write(".")
			}
		}
	)
	console.log("\n🟢 Database is Available for Connections!")

}

async function isDatabaseAvailable(bail) {
	const availability = new Promise((res, rej) => {
		exec("docker exec postgres-dev pg_isready -h localhost", (err, stdout) => {
			const ret = stdout.includes("accepting connections")

			if (ret) {
				res(ret)
			}
			else {
				rej("DB Unavailable")
			}
		})
	})

	await availability
}
