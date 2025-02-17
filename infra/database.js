import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
  });

  try {
    await client.connect();
    const response = await client.query(queryObject);
    return response;
  } catch (err) {
    console.log(`@ '${queryObject}': ${err}`);
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
