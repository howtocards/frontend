import Ajv from 'ajv'
import { Err } from '@es2/option-result'


export const ajv = new Ajv()

export const validate = (schema) => {
  const isValid = ajv.compile(schema)

  return function validate_(ctx, next) {
    if (!isValid(ctx.request.body)) {
      // eslint-disable-next-line no-console
      console.error(ctx.request.body, isValid.errors)
      return Err('invalid_request_body')
    }
    return next()
  }
}
