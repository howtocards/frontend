export class EmptyResultError extends Error {
  constructor() {
    super('empty_result')
    this.httpStatus = 204
  }
}

export class InternalServerError extends Error {
  constructor(error) {
    super('internal_server_error')
    this.message = error
    this.httpStatus = 500
  }
}

export class ValidationError extends Error {
  constructor(formErrors) {
    super('validation_error')
    this.message = formErrors
    this.httpStatus = 400
  }
}

export class AuthorizationError extends Error {
  constructor() {
    super('invalid_authorization')
    this.httpStatus = 401
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('not_found')
    this.httpStatus = 404
  }
}
