import { Ok, Err } from '@es2/option-result'
import { createRest } from 'createrest'
import Ajv from 'ajv'

import { userRegister, userLogin, userGet, userSessionDrop } from '../commands/user'


const ajv = new Ajv()

const validate = (scheme) => {
  const valid = ajv.compile(scheme)

  return (ctx, next) => {
    if (!valid(ctx.request.body)) {
      return Err(valid.errors)
    }
    return next()
  }
}

const authenticated = () => async (ctx, next) => {
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

const api = () => Ok({
  cards: 'works',
})

const status = () => Ok({
  status: 'ok',
})

const register = (ctx) => userRegister(ctx.request.body)
const login = (ctx) => userLogin(ctx.request.body)
const me = (ctx) => Ok({ user: { email: ctx.user.email } })
const drop = (ctx) => userSessionDrop(ctx.user, ctx.request.body.token)

const authScheme = {
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
}

const dropSessionScheme = {
  properties: {
    token: { type: 'string' },
  },
}

export const routes = createRest((root) => {
  root.get('/', api)
  root.get('/status', authenticated(), status)

  root.scope('account', (account) => {
    account.get(authenticated(), me)
    account.post(validate(authScheme), register)

    account.scope('session', (session) => {
      session.post(validate(authScheme), login)
      session.delete(authenticated(), drop)
    })
  })
})
