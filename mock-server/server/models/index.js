import Future from "fluture"
import Loki from "lokijs"

/**
 * @type {Loki.Collection<{ email: string, password: string }>}
 */
let Users

/**
 * @type {Loki.Collection<{ userId: number, token: string }>}
 */
let Tokens

/**
 * @type {Loki.Collection<{ authorId: number, content: string, title: string }>}
 */
let Cards

export const models = {
  Cards,
  Tokens,
  Users,
}

/**
 * @type {typeof Loki.LokiConstructor}
 */
let db

const makeCollection = (name, options) => {
  let coll = db.getCollection(name)

  if (!coll) {
    coll = db.addCollection(name, options)
  }

  return coll
}

const databaseInitialize = (reject, resolve) => (error) => {
  if (error) reject(error)
  else {
    models.Users = makeCollection("users", { unique: ["email"] })
    models.Tokens = makeCollection("tokens", { unique: ["email"] })
    models.Cards = makeCollection("cards", {})
    resolve()
  }
}

export function createDatabase() {
  return Future((reject, resolve) => {
    db = new Loki("/tmp/howtocards.db", {
      verbose: true,
      autoload: true,
      autoloadCallback: databaseInitialize(reject, resolve),
      autosave: true,
      autosaveInterval: 1000,
    })
  })
}
