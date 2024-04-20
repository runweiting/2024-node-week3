function handleSuccess(res, post, statusCode) {
  res
    .status(statusCode)
    .send({
      status: true,
      post,
    })
    .end();
}

module.exports = handleSuccess;
