import database from "infra/database"

async function resetDB() {
	await database.query("drop schema public cascade; create schema public")
}
beforeAll(resetDB)

test("DELETE at '/api/v1/migrations", async () => {
	const res = await fetch(`${process.env.APP_URL}/api/v1/migrations`, {
		method: "DELETE"
	})
	const body = await res.json()

	expect(res.status).toBe(405)
	expect(body.error).toBe(`Method "DELETE" is not allowed.`)
})
