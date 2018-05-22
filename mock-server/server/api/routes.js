import { Ok, Err } from '@es2/option-result'
import { createRest } from 'createrest'
import Ajv from 'ajv'

import { userRegister } from '../commands/register'


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

const api = () => Ok({
  cards: 'works',
})

const status = () => Ok({
  status: 'ok',
})

const register = (ctx) => userRegister(ctx.request.body)

const registerScheme = {
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
}

export const routes = createRest((root) => {
  root.get('/', api)
  root.get('/status', status)

  root.scope('account', (account) => {
    account.post(validate(registerScheme), register)
  })
})
