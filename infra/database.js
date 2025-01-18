import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
  });
  await client.connect();
  const response = await client.query(queryObject);
  client.end();

  return response;
}

export default {
  query,
};
