import { Option, Result } from '@es2/option-result'
import { EmptyResultError } from '../errors'


const STATUS_OK = 200
const STATUS_NO_CONTENT = 204
const STATUS_INTERNAL_SERVER_ERROR = 500
const STATUS_NOT_IMPLEMENTED = 501
const STATUS_BAD_REQUEST = 400

/**
 * Wrap any result from route to Result.
 * If Option passed as result, converts it to Result.okOr(EmptyResultError)
 * @param {Result|Option|any} result
 * @return {Result}
 */
const wrapResult = (result) => {
  if (typeof result === 'undefined' || result === null) {
    return Result.Err(new EmptyResultError())
  }

  if (Result.isResult(result)) {
    return result
  }

  if (Option.isOption(result)) {
    return result.okOr(new EmptyResultError())
  }

  return Result.Ok(result)
}

/**
 * Resolve status of result from route
 * @param {Result} result
 * @return {number}
 */
const statusOf = (result) => {
  if (result.isOk()) {
    return STATUS_OK
  }

  const error = result.unwrapErr()

  if (error instanceof EmptyResultError) {
    return STATUS_NO_CONTENT
  }

  return STATUS_NOT_IMPLEMENTED
}

export const apiWrapper = () => async (ctx, next) => {
  ctx.status = STATUS_NOT_IMPLEMENTED
  try {
    const result = wrapResult(await next())

    console.log({ result: result.isOk(), status: ctx.status })
    ctx.status = ctx.status === STATUS_NOT_IMPLEMENTED
      ? statusOf(result)
      : ctx.status

    const ok = ctx.status < STATUS_BAD_REQUEST

    ctx.body = result
      .map((value) => ({ result: value }))
      .mapErr((error) => ({ error: error.message || error.name || error }))
      .chainErr(Result.Ok)
      .map((part) => ({
        ok,
        ...part,
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
    console.log('error', error)
    ctx.app.emit('error', error, ctx)

    return Result.Err(error)
  }
}
