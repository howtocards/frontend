import { Option, Result } from '@es2/option-result'
import { EmptyResult } from '../errors'


const STATUS_OK = 200
const STATUS_INTERNAL_SERVER_ERROR = 500
const STATUS_BAD_REQUEST = 400

const wrapResult = (result) => {
  if (typeof result === 'undefined' || result === null) {
    return Result.Err(new EmptyResult())
  }

  if (Result.isResult(result)) {
    return result
  }

  if (Option.isOption(result)) {
    return result.okOr(new EmptyResult())
  }

  return Result.Ok(result)
}


export const apiWrapper = () => async (ctx, next) => {
  try {
    const result = wrapResult(await next())

    const ok = ctx.status < STATUS_BAD_REQUEST

    ctx.body = result
      // TODO: correctly handle errors
      .mapErr((error) => ({
        ok: false,
        error: error.message || error.name || error,
        status: ctx.status,
      }))
      .map((value) => ({
        ok,
        result: value,
        status: ctx.status,
      }))
      .unwrap()

    return result
  }
  catch (error) {
    ctx.status = STATUS_INTERNAL_SERVER_ERROR

    ctx.body = {
      error: 'internal_server_error',
      message: 'Internal Server Error',
      ok: false,
      status: ctx.status,
    }

    ctx.app.emit('error', error, ctx)

    return Result.Err(error)
  }
}
