import migrationsRunner from "node-pg-migrate";
import path from "node:path";

export default async function migrations(req, res) {
	// Init Config (Proper for 'GET')
	const migrationConfig = {
		databaseUrl: process.env.DATABASE_URL,
		migrationsTable: "pgmigrations",
		dir: path.join("infra", "migrations"),

		direction: "up",
		dryRun: true,
	};

	if (req.method == "POST") {
		migrationConfig.dryRun = false;
	} else if (req.method != "GET") {
		res.status(405).end();
	}

	const migrationsAvailable = await migrationsRunner(migrationConfig);
	res.status(200).send(migrationsAvailable);
}
