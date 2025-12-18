import database from "infra/database.js"

const host = "http://localhost:3000"

test("GET '/api/v1/migrations'", async () => {
	database.query("SHOW server_version;")
	const res = await fetch(`${host}/api/v1/migrations`)
	expect(res.status).toBe(200)

	const body = await res.json()
	expect(Array.isArray(body)).toBe(true)
})
