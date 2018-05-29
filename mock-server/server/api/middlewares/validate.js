import Ajv from 'ajv'
import { Err } from '@es2/option-result'


export const ajv = new Ajv()

export const validate = (schema) => {
  const isValid = ajv.compile(schema)

  return (ctx, next) => {
    if (!isValid(ctx.request.body)) {
      console.error(ctx.request.body, isValid.errors)
      return Err('invalid_request_body')
    }
    return next()
  }
}
