import Future from 'fluture'

import { userGet } from '../../commands/user'
import { AuthorizationError } from '../errors'


const MIN_TOKEN_LENGTH = 10

export const authenticated = () => {
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
          .map(next)
      }
    }

    return Future.reject(new AuthorizationError())
  }

  middleware.displayName = '`authenticated'

  return middleware
}
