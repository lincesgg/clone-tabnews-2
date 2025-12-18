import database from "infra/database.js"

const host = "http://localhost:3000"

beforeAll(resetDB)

async function resetDB() {
	await database.query("drop schema public cascade; create schema public")
}

test("POST '/api/v1/migrations'", async () => {
	const getRes = await fetch(`${host}/api/v1/migrations`)
	const getMigrations = await getRes.json()

	const postRes1 = await fetch(`${host}/api/v1/migrations`, {
		method: "POST"
	})
	const migExecuted1 = await postRes1.json()
	// status? - Must be 201, if exists at least 1 migration
	expect(postRes1.status).toBe(201)
	// Array Response?
	expect(Array.isArray(migExecuted1)).toBe(true)

	const postRes2 = await fetch(`${host}/api/v1/migrations`)
	// status?
	expect(postRes2.status).toBe(200)
	const migExecuted2 = await postRes2.json()

	// Were Migrations Live-Run? / Is Safe To repeat Migrations?
	expect(migExecuted2.length).toBe(0)

	// Only Pending Migrations Were Done?
	const wereDryRunMigrationExecutedAlive = compareMigrationsLists(getMigrations, migExecuted1)
	expect(wereDryRunMigrationExecutedAlive).toBe(true)

})

function compareMigrationsLists(list1, list2) {

	if (list1.length != list2.length) return false

	for (const migrationIdx in list1) {
		const migObj1 = list1[migrationIdx]
		const migObj2 = list2[migrationIdx]

		// Objects have Same Keys? ---
		let uniqueKeys = Object.keys(migObj1).concat(
			Object.keys(migObj2)
		)
		// Remove Duplicated Keys
		uniqueKeys = uniqueKeys.filter((elm, idx) => {
			return (uniqueKeys.indexOf(elm) == idx)
		})

		if (uniqueKeys.length != Object.keys(migObj1).length || uniqueKeys.length != Object.keys(migObj2).length)
			return false

		// Objects has same Values? ---
		for (const key of uniqueKeys) {
			if (migObj1[key] != migObj2[key])
				return false
		}
	}
	return true
}
