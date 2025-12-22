const host = "http://localhost:3000";

test("GET request '/api/v1/status' should return 200!", async () => {
	const res = await fetch(`${process.env.APP_URL}//api/v1/status`);
	expect(res.status).toBe(200);

	const resBody = await res.json();
	const databaseBody = resBody.dependencies.database;

	// .update_at Pode ser Convertido Para uma Data
	// Essa Data ela deve ser explicitamente representada update_at (Não explicito: null → 1970 0:0)
	const parsedDate = new Date(resBody.update_at);
	expect(parsedDate.toISOString()).toEqual(resBody.update_at);

	// Connections (Amount) must Be Int
	expect(Number.isInteger(databaseBody.max_connections)).toEqual(true);
	expect(Number.isInteger(databaseBody.crr_connections)).toEqual(true);

	// If There's More that 2 crr_connections per time, then there is connections leakage
	// 1º Connection, for the query that is getting the information
	// 2º Connection may exist, because provider provides a interface 2 DB on their site
	expect(databaseBody.crr_connections).toBeLessThanOrEqual(2);
});
