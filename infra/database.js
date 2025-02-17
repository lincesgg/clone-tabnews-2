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

  console.log(queryObject);
  try {
    console.log("OPENED");
    const response = await client.query(queryObject);
    return response;
  } catch (err) {
    console.log(err);
  } finally {
    console.log("ENDED");
    client.end();
  }
}

export default {
  query,
};
