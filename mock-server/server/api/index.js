import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { createKoaRouter } from 'createrest-koa'

import { apiWrapper } from './middlewares/api-wrapper'
import { routes } from './routes'


export const api = new Koa()
const router = createKoaRouter(routes)

api.use(apiWrapper())
api.use(bodyParser())
api.use(router.routes(), router.allowedMethods())
