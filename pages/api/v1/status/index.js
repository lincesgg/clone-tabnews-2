import database from "#infra/database.js";

async function status(req, res) {
  const a = await database.query("SELECT 1 + 1;");
  console.log(a.rows);
  res.status(200).json({
    request: "Recebido!",
  });
}

export default status;
