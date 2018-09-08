import * as http from 'http'
import Koa from 'koa'
import mount from 'koa-mount'
import logger from 'koa-logger'
import cors from '@koa/cors'
import compress from 'koa-compress'
import { contentSecurityPolicy } from 'koa-helmet'

import { api, printRoutes } from './api'
import { createDatabase } from './models'


function createApp() {
  const app = new Koa()

  app.use(cors())
  app.use(compress())
  app.use(logger())

  app.use(mount('/api', api))

  app.use(contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  }))

  app.use((ctx) => {
    ctx.body = {
      ok: false,
      error: 'route_not_found',
      status: 404,
    }
  })

  return app
}

const DEFAULT_PORT = 3000

export async function main() {
  await createDatabase()
  const app = createApp()
  const server = http.createServer(app.callback())

  server.listen(process.env.PORT || DEFAULT_PORT)
  server.on('error', (error) => {
    throw error
  })
  server.on('listening', () => {
    const address = server.address()

    // eslint-disable-next-line no-console
    console.log(`\n\\> Listening on http://localhost:${address.port}\n`)

    printRoutes()
  })
}
