const host = "http://localhost:3000"

test("GET '/api/v1/migrations'", async () => {
	const res = await fetch(`${host}/api/v1/migrations`)
	expect(res.status).toBe(200)

	const body = await res.json()
	expect(Array.isArray(body)).toBe(true)
})
