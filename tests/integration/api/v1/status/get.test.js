const host = "http://localhost:3000";

test("GET request '/api/v1/status' should return 200!", async () => {
  const res = await fetch(`${host}//api/v1/status`);
  expect(res.status).toBe(200);

  const resBody = await res.json();
  const databaseBody = resBody.dependencies.database;

  // .update_at Pode ser Convertido Para uma Data
  // Essa Data ela deve ser explicitamente representada update_at (Não explicito: null → 1970 0:0)
  const parsedDate = new Date(resBody.update_at);
  expect(parsedDate.toISOString()).toEqual(resBody.update_at);

  // databaseBody.version deve estar no modelo "16.6", na mesma versão que a versão de fato do postgres
  expect(databaseBody.version).toEqual("16.6");

  // Connections (Amount) must Be Int
  expect(Number.isInteger(databaseBody.max_connections)).toEqual(true);
  expect(Number.isInteger(databaseBody.crr_connections)).toEqual(true);

  // If There's More that 1 crr_connections per time, then there is connections leakage
  expect(databaseBody.crr_connections).toBe(1);
});
