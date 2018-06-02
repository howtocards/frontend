import { Ok } from '@es2/option-result'

import { userRegister, userLogin, userSessionDrop } from '../../commands/user'
import { validate } from '../middlewares/validate'
import { authenticated } from '../middlewares/auth'
import { authScheme, sessionDropSchema } from '../schemes/account'


const register = (ctx) => userRegister(ctx.request.body)
const login = (ctx) => userLogin(ctx.request.body)
const me = (ctx) => Ok({ user: { id: ctx.user.$loki, email: ctx.user.email } })
const drop = (ctx) => userSessionDrop(ctx.user, ctx.request.body.token)

export const accountApi = (account) => {
  account.get(authenticated(), me)
  account.post(validate(authScheme), register)

  account.scope('session', (session) => {
    session.post(validate(authScheme), login)
    session.delete(authenticated(), validate(sessionDropSchema), drop)
  })
}
