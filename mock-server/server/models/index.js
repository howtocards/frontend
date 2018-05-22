const Loki = require('lokijs')

/**
 * @type {Loki.Collection<{ email: string, password: string }>}
 */
let Users

/**
 * @type {Loki.Collection<{ userId: number, token: string }>}
 */
let Tokens

const models = {
  Users,
  Tokens,
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

const databaseInitialize = (resolve, reject) => (error) => {
  if (error) reject(error)
  else {
    models.Users = makeCollection('users', { unique: ['email'] })
    models.Tokens = makeCollection('tokens', { unique: ['email'] })
    resolve()
  }
}

function createDatabase() {
  return new Promise((resolve, reject) => {
    db = new Loki('/tmp/howtocards.db', {
      autoload: true,
      autoloadCallback: databaseInitialize(resolve, reject),
      autosave: true,
      autosaveInterval: 1000,
    })
  })
}

module.exports = { models, createDatabase }
