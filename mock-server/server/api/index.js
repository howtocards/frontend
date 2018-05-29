import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { printRoutes as printRestRoutes } from 'createrest'
import { createKoaRouter } from 'createrest-koa'

import { apiWrapper } from './middlewares/api-wrapper'
import { routes } from './routes'


export const api = new Koa()
const router = createKoaRouter(routes)

api.use(bodyParser())
api.use(apiWrapper())
api.use(router.routes(), router.allowedMethods())

export function printRoutes() {
  printRestRoutes(routes)
}
