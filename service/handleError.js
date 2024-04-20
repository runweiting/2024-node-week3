function handleError(res, err) {
  let message = "";
  if (err) {
    message = err.message;
  } else {
    message = "欄位未正確填寫或無此 id";
  }
  res
    .status(400)
    .send({
      status: true,
      message,
    })
    .end();
}

module.exports = handleError;
