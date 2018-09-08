import { Err } from '@es2/option-result'
import { userGet } from '../../commands/user'


const MIN_TOKEN_LENGTH = 10

export const authenticated = () => {
  const middleware = async (ctx, next) => {
    if (ctx.request.header.authorization) {
      const [word, token] = ctx.request.header.authorization.split(' ')

      if (word === 'token' && token && token.length > MIN_TOKEN_LENGTH) {
        const userResult = (await userGet(token))
          .map((user) => {
            ctx.user = user
            return user
          })

        // if token valid
        if (userResult.isOk()) {
          return next()
        }

        return userResult
      }
    }

    return Err('invalid_authorization')
  }

  middleware.displayName = '`authenticated'

  return middleware
}
