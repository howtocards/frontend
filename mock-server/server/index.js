import * as http from "http"
import * as path from "path"
import Koa from "koa"
import mount from "koa-mount"
import logger from "koa-logger"
import cors from "@koa/cors"
import compress from "koa-compress"
import { contentSecurityPolicy } from "koa-helmet"
import dotenv from "dotenv"

import { api, printRoutes } from "./api"
import { createDatabase } from "./models"
// import { rpc } from './api/rpc'

const DEFAULT_PORT = 3000

export async function main() {
  configureEnv()
  await createDatabase().promise()

  const app = createApp()
  const server = http.createServer(app.callback())

  server.on("error", errorHandler)
  server.on("listening", listeningHandler)
  server.listen(process.env.BACKEND_PORT || DEFAULT_PORT)
}

function configureEnv() {
  dotenv.config({
    path: path.resolve(__dirname, "..", "..", ".env"),
  })
}

function createApp() {
  const app = new Koa()

  app.use(cors())
  app.use(compress())
  app.use(logger())

  // app.use(mount('/rpc', rpc))
  app.use(mount("/api", api))

  app.use(
    contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    }),
  )

  app.use(notFoundMiddleware)

  return app
}

function notFoundMiddleware(ctx) {
  ctx.status = 404
  ctx.body = {
    ok: false,
    error: "route_not_found",
    status: 404,
  }
}

function errorHandler(error) {
  throw error
}

function listeningHandler() {
  const address = this.address()

  // eslint-disable-next-line no-console
  console.log(`\n\\> Listening on http://localhost:${address.port}\n`)

  printRoutes()
}
