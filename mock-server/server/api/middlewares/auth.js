import { Err } from '@es2/option-result'
import { userGet } from '../../commands/user'


export const authenticated = () => async (ctx, next) => {
  if (ctx.request.header.authorization) {
    const [word, token] = ctx.request.header.authorization.split(' ')

    if (word === 'token' && token && token.length > 10) {
      const result = (await userGet(token))
        .map((user) => {
          ctx.user = user
          return user
        })

      if (result.isOk()) {
        return next()
      }

      return result
    }
  }

  return Err('invalid_authorization')
}
