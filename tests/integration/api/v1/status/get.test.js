const host = "http://localhost:3000";

test("GET request '/api/v1/status' should return 200!", async () => {
  const res = await fetch(`${host}//api/v1/status`);
  expect(res.status).toBe(200);
});
