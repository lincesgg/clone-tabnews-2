import migrationRunner from "node-pg-migrate"
import path from "node:path"
import database from "infra/database.js"

export default async function migrations(req, res) {
	const dbClient = await database.databaseClient()

	const defaultMigConfig = {
		dbClient,
		dir: path.join("infra", "migrations"),
		checkOrder: true,
		direction: "up",
		dryRun: true,
		migrationsTable: "pgmigrations",
		verbose: true
	}

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

		default:
			res.status(405).end()
			break

	}

	// If not close, migrationRunner Lock is not Removed
	dbClient.end()
}
