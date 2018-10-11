import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { printRoutes as printRestRoutes, createRest } from 'createrest'
import { createKoaRouter } from 'createrest-koa'

import { apiWrapper } from './middlewares/api-wrapper'
import { rootApi } from './routes'


export const api = new Koa()

const routes = createRest(rootApi)
const router = createKoaRouter(routes)

api.use(bodyParser())
api.use(apiWrapper())
api.use(router.routes(), router.allowedMethods())

export function printRoutes() {
  printRestRoutes(routes)
}
