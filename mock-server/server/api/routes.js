import { Ok, None } from '@es2/option-result'
import { createRest } from 'createrest'


const api = () => Ok({
  cards: 'works',
})

const status = () => Ok({
  status: 'ok',
})

const test = async () => Ok(1)

export const routes = createRest((root) => {
  root.get('/', api)
  root.get('/status', status)
  root.get('/test', test)
})
