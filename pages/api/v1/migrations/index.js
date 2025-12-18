import migrationRunner from "node-pg-migrate"
import path from "node:path"

export default async function migrations(req, res) {
	const runMigrationConfig = {
		databaseUrl: process.env.DATABASE_URL,
		dir: path.join("infra", "migrations"),
		checkOrder: true,
		direction: "up",
		dryRun: true,
		migrationsTable: "pgmigrations",
		verbose: true
	}

	if (req.method == "POST") {
		runMigrationConfig.dryRun = false
	}
	else if (req.method != "GET") {
		res.status(405).end()
	}

	const migrationRes = await migrationRunner(runMigrationConfig)
	res.status(200)
	res.send(migrationRes)
	res.end()
}
