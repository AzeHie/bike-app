class HttpError extends Error { // Error == built in method/class
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

module.exports = HttpError;