import flatten from 'flat'
import Koa from 'koa'
import compose from 'koa-compose'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

import { validate } from './middlewares/validate'
import { authScheme } from './schemes/account'


function createRpc(scheme) {
  const rpc = new Koa()
  const router = createRpcRouter(scheme)

  rpc.use(bodyParser())
  rpc.use(router.routes(), router.allowedMethods())

  return rpc
}

function createRpcRouter(scheme) {
  const router = new Router()
  const methods = createMethods(scheme)
  const handler = createRpcHandler(methods)

  // router.post('/', handler)
  router.post('/', handler)

  return router
}

function createMethods(scheme) {
  const flatScheme = flatten(scheme, { delimiter: '::', safe: true })

  return Object
    .entries(flatScheme)
    .reduce((methods, [methodName, middlewares]) => {
      // eslint-disable-next-line no-param-reassign
      methods[methodName] = compose(middlewares)
      return methods
    }, {})
}

function createRpcHandler(methods) {
  return async (ctx /* , next */) => {
    async function callMethod({ method, params /* id */ }) {
      const koaMiddleware = methods[method]

      return koaMiddleware({ ...ctx, rpc: { params } })
    }

    if (isSimpleRpc(ctx)) {
      const result = await callMethod(ctx.request.body)

      ctx.body = result
      // console.log({ result })
    }
    else if (isBatchRpc(ctx)) {
      const results = await Promise.all(ctx.request.body.map(callMethod))

      ctx.body = results
      // console.log({ results })
    }
    else {
      ctx.body = ctx.request.body
    }
  }
}

function isSimpleRpc(ctx) {
  return ctx.request.body && ctx.request.body.jsonrpc === '2.0'
}

function isBatchRpc(ctx) {
  return ctx.request.body && Array.isArray(ctx.request.body) && ctx.request.body[0] && ctx.request.body[0].jsonrpc === '2.0'
}


const register = () => 'EXAMPLE'

const rpcScheme = {
  account: {
    create: [validate(authScheme), register],
  },
}

export const rpc = createRpc(rpcScheme)
