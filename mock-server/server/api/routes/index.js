import { Ok, None } from '@es2/option-result'
import { createRest } from 'createrest'

import { authenticated } from '../middlewares/auth'
import { accountApi } from './account'


const api = () => Ok({
  cards: 'works',
})

const status = () => Ok({
  status: 'ok',
})


export const routes = createRest((root) => {
  root.get('/', api)
  root.get('/status', authenticated(), status)
  root.scope('account', accountApi)
})
