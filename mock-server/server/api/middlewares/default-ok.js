
export const defaultOk = (ctx, next) => {
  ctx.status = 200
  return next()
}
