import database from "infra/database";
import dotenv from "dotenv";

const host = "http://localhost:3000";
console.log(process.env.POSTGRES_DB);

test("GET '/api/v1/migrations' should return 200!", async () => {
	const res = await fetch(`${host}/api/v1/migrations`, {
		method: "GET",
	});
	expect(res.status).toEqual(200);

	const resBody = await res.json();
	expect(Array.isArray(resBody)).toEqual(true);
});
