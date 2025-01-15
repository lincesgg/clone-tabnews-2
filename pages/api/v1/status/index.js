function status(req, res) {
  res.status(200).json({
    request: "Recebido!",
  });
}

export default status;
