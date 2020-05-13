class ErrorHandler {
  run(res, message, status) {
    status = status || 500;
    res.status(status).json({ error: { message } });
  }
}

export default new ErrorHandler();
