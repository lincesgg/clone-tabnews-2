import database from "#infra/database.js";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const dbVersionRes = await database.query("SHOW server_version;");
  const dbVersion = dbVersionRes.rows[0].server_version;

  const dbMaxConnectionsRes = await database.query("SHOW max_connections;");
  const dbMaxConnections = dbMaxConnectionsRes.rows[0].max_connections;

  const dbConnectionsRes = await database.query(
    `SELECT count(*)::int FROM pg_stat_activity WHERE datname = '${process.env.POSTGRES_DB}';`,
  );
  const dbConnections = dbConnectionsRes.rows[0].count;

  res.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: dbVersion,
        max_connections: parseInt(dbMaxConnections),
        crr_connections: parseInt(dbConnections),
      },
    },
  });
}

export default status;
