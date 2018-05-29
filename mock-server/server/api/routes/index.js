import { Ok } from '@es2/option-result'
import { createRest } from 'createrest'

import { userRegister, userLogin, userSessionDrop } from '../../commands/user'
import { validate } from '../middlewares/validate'
import { authenticated } from '../middlewares/auth'
import { authScheme, sessionDropSchema } from '../schemes/account'


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


export const routes = createRest((root) => {
  root.get('/', api)
  root.get('/status', authenticated(), status)

  root.scope('account', (account) => {
    account.get(authenticated(), me)
    account.post(validate(authScheme), register)

    account.scope('session', (session) => {
      session.post(validate(authScheme), login)
      session.delete(authenticated(), validate(sessionDropSchema), drop)
    })
  })
})
