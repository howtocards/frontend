import Future from "fluture"
import { EmptyResultError, InternalServerError, CustomError } from "../errors"

const STATUS_OK = 200
// const STATUS_NO_CONTENT = 204
// const STATUS_INTERNAL_SERVER_ERROR = 500
const STATUS_NOT_IMPLEMENTED = 501
const STATUS_BAD_REQUEST = 400

export const apiWrapper = () => async (ctx, next) => {
  ctx.status = STATUS_NOT_IMPLEMENTED

  const responseFuture = (await resolveMiddlewareToFuture(ctx, next))
    .chain(emptyToError)
    .map((value) => ({
      ok: true,
      result: value,
      status: statusDefaultOr(ctx.status, STATUS_OK),
    }))
    .mapRej((error) => ({
      ok: false,
      error: error.message || error.name || error,
      status: statusDefaultOr(
        ctx.status,
        error.httpStatus || STATUS_BAD_REQUEST,
      ),
    }))
    .chainRej(Future.of)

  const response = await responseFuture.promise()

  ctx.status = response.status
  ctx.body = response

  return responseFuture
}

const resolveMiddlewareToFuture = async (ctx, next) => {
  try {
    return Future.resolve(await next())
  } catch (error) {
    if (error instanceof CustomError) {
      return Future.reject(error)
    }
    // eslint-disable-next-line no-console
    // console.error('error', error)
    // ctx.app.emit('error', error, ctx)
    return Future.reject(new InternalServerError(error))
  }
}

const emptyToError = (result) => {
  if (typeof result === "undefined" || result === null) {
    return Future.reject(new EmptyResultError())
  }
  return result
}

const statusDefaultOr = (currentStatus, defaultStatus) =>
  currentStatus === STATUS_NOT_IMPLEMENTED ? defaultStatus : currentStatus
