import migrationRunner from "node-pg-migrate"
import path from "node:path"
import database from "infra/database.js"

export default async function migrations(req, res) {
	if (sanitizeRequest(req, res) == 1) {
		return
	}

	let dbClient;
	try {
		dbClient = await database.databaseClient()
		await respondRequest(dbClient, req, res)
	}
	catch (err) {
		console.log(`ERR [api/v1/migrations]: ${err}`)
		throw err
	}
	finally {
		// If not close, migrationRunner Lock is not Removed
		if (dbClient) dbClient.end()
	}

}

function sanitizeRequest(req, res) {
	if (!(["GET", "POST"].includes(req.method))) {
		res.status(405).json({
			error: `Method "${req.method}" is not allowed.`
		})
		return 1
	}
	return 0
}

async function respondRequest(dbClient, req, res) {
	const defaultMigConfig = getMigrationsRunnerConfig(dbClient)

	switch (req.method) {
		case "GET":
			const pendingMigrations = await migrationRunner(defaultMigConfig)
			res
				.status(200)
				.json(pendingMigrations)
			break

		case "POST":
			const migrationsDone = await migrationRunner({
				...defaultMigConfig,
				dryRun: false
			})

			res
				.status(migrationsDone.length == 0 ? 200 : 201)
				.json(migrationsDone)
			break
	}

}

function getMigrationsRunnerConfig(dbClient) {
	return {
		dbClient,
		dir: path.join("infra", "migrations"),
		checkOrder: true,
		direction: "up",
		dryRun: true,
		migrationsTable: "pgmigrations",
		verbose: true,
	}
}
