const { exec } = require("node:child_process")

waitForDatabaseAvalaibility()

async function waitForDatabaseAvalaibility() {

	let isDbAvailable = await isDatabaseAvailable()

	if (!isDbAvailable) {
		process.stdout.write("\n🔴 Database Unavailable, ⌛ Waiting for Availability ")
	}

	while (!isDbAvailable) {
		isDbAvailable = await isDatabaseAvailable()
		process.stdout.write(".")
		await sleep(150)
	}

	console.log("\n🟢 Database is Available for Connections!")
	return 0
}

function isDatabaseAvailable() {
	return new Promise((res, rej) => {
		exec("docker exec postgres-dev pg_isready -h localhost",
			(err, stdout) => {
				ret = stdout.includes("accepting connections")
				res(ret)
			})
	})
}

function sleep(ms) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res()
		}, ms)
	})
}


