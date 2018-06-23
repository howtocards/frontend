import { Err } from '@es2/option-result'
import { userGet } from '../../commands/user'


export const authenticated = () => async function authenticated_(ctx, next) {
  if (ctx.request.header.authorization) {
    const [word, token] = ctx.request.header.authorization.split(' ')

    if (word === 'token' && token && token.length > 10) {
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
