import { Ok } from '@es2/option-result'
import { createRest } from 'createrest'
import { defaultOk } from './middlewares/default-ok'


const api = () => Ok({
  cards: 'works',
})

const status = () => Ok({
  status: 'ok',
})

export const routes = createRest((root) => {
  root.beforeEach(defaultOk)

  root.get('/', api)
  root.get('/status', status)
})
