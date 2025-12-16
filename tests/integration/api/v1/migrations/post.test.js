const host = "http://localhost:3000";

console.log(process.env.POSTGRES_PORT);

test("POST '/api/v1/migrations' should return 200!", async () => {
	const res = await fetch(`${host}/api/v1/migrations`, {
		method: "POST",
	});
	expect(res.status).toEqual(200);

	const resBody = await res.json();
	expect(Array.isArray(resBody)).toEqual(true);
});
