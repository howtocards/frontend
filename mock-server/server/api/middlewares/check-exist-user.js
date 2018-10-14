import { userGet } from '../../commands/user'


const MIN_TOKEN_LENGTH = 10

export const checkExistUser = () => {
  const middleware = (ctx, next) => {
    if (ctx.request.header.authorization) {
      const [word, token] = ctx.request.header.authorization.split(' ')

      if (word === 'bearer' && token && token.length > MIN_TOKEN_LENGTH) {
        return userGet(token)
          .map((user) => {
            ctx.user = user
            ctx.auth = { token }
            return user
          })
          .promise()
          .then(next)
      }
      return next({ user: { $loki: undefined } })
    }
    return next({ user: { $loki: undefined } })
  }

  middleware.displayName = 'checkExistUser'

  return middleware
}
