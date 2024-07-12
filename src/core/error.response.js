const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
}

const ReasonStatusCode = {
  FORBIDDEN: 'Forbidden errror',
  CONFLICT: 'Confilct error',
}

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    status = StatusCode.FORBIDDEN
  ) {
    super(message, status)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    status = StatusCode.FORBIDDEN
  ) {
    super(message, status)
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
}
