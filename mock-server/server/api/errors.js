export class CustomError extends Error {}

export class EmptyResultError extends CustomError {
  constructor() {
    super("empty_result")
    this.httpStatus = 204
  }
}

export class InternalServerError extends CustomError {
  constructor(error) {
    super("internal_server_error")
    this.message = error
    this.httpStatus = 500
  }
}

export class ValidationError extends CustomError {
  constructor(formErrors) {
    super("validation_error")
    this.message = formErrors
    this.httpStatus = 400
  }
}

export class AuthorizationError extends CustomError {
  constructor(text = "invalid_authorization") {
    super(text)
    this.httpStatus = 401
  }
}

export class NotFoundError extends CustomError {
  constructor(type = "not_found") {
    super(type)
    this.httpStatus = 404
  }
}
