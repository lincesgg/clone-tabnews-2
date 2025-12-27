import { Client } from "pg";

async function query(queryObject) {

	let client
	try {
		client = await databaseClient()
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
	databaseClient,
};

// Utils ---
async function databaseClient(optionsUpdates = {}) {
	const client = new Client({
		host: process.env.POSTGRES_HOST,
		port: process.env.POSTGRES_PORT,
		database: process.env.POSTGRES_DB,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		ssl: getSSLValues(),
		...optionsUpdates
	});

	await client.connect();
	return client
}

function getSSLValues() {
	if (process.env.POSTGRES_CA) {
		return {
			ca: process.env.POSTGRES_CA,
		};
	}

	const inProd = process.env.NODE_ENV == "production";
	return inProd ? true : false;
}
