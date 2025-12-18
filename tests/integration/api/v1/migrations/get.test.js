import database from "infra/database.js"

const host = "http://localhost:3000"

beforeAll(resetDB)

async function resetDB() {
	await database.query("drop schema public cascade; create schema public")
}

test("GET '/api/v1/migrations'", async () => {
	const res = await fetch(`${host}/api/v1/migrations`)
	expect(res.status).toBe(200)

	const body = await res.json()
	expect(Array.isArray(body)).toBe(true)
	expect(body.length).toBeGreaterThan(0)
})
