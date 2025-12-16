import { Client } from "pg";

async function query(queryObject) {
	const client = new Client({
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		database: process.env.POSTGRES_DB,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		ssl: getSSLValues(),
	});

	try {
		await client.connect();
		const response = await client.query(queryObject);
		return response;
	} catch (err) {
		console.log("@", queryObject, `→ ${err}`);
		throw err;
	} finally {
		try {
			client.end();
		} catch (err) {
			console.log(`Err @ Finally: ${err}`);
		}
	}
}

export default {
	query,
};

// Utils ---
function getSSLValues() {
	if (process.env.POSTGRES_CA) {
		return {
			ca: process.env.POSTGRES_CA,
		};
	}

	const inDev = process.env.NODE_ENV == "development";
	return inDev ? false : true;
}
