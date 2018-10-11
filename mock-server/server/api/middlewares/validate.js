import Ajv from 'ajv'
import Future from 'fluture'

import { ValidationError } from '../errors'


export const ajv = new Ajv()

export const validate = (schema) => {
  const isValid = ajv.compile(schema)

  const middleware = (ctx, next) => {
    if (!isValid(ctx.request.body)) {
      // eslint-disable-next-line no-console
      console.error(ctx.request.body, isValid.errors)
      return Future.reject(new ValidationError(isValid.errors))
    }
    return next()
  }

  middleware.displayName = '`validate'

  return middleware
}
