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
          .mapRej((error) => typeof error === 'string'
            ? new AuthorizationError(error)
            : error)
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

export const authenticatedOptional = () => {
  const authMiddleware = authenticated()
  const middleware = (ctx, next) => authMiddleware(ctx, next)
    .chainRej((error) => error instanceof AuthorizationError
      ? Future.resolve()
      : error)
    .map(next)

  middleware.displayName = '`authenticatedOptional'

  return middleware
}
