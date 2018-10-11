import Future from 'fluture'
import { models } from '../models'


// eslint-disable-next-line no-magic-numbers
const createToken = (iterations = 3, sep = '') => {
  let cnt = 0
  const result = []

  while (cnt++ < iterations) {
    // eslint-disable-next-line no-magic-numbers
    result.push(Math.floor(Math.random() * 100000000000).toString(36))
  }

  return result.join(sep)
}

const USER_TOKEN_SIZE = 5

/**
 * @param {{ email: string, password: string }} registerData
 */
export const userRegister = (registerData) => {
  const usersWithEmail = models.Users.chain().find({ email: registerData.email })

  if (usersWithEmail.count() > 0) {
    return Future.reject('already_exists')
  }

  const createdUser = models.Users
    .insert({ email: registerData.email, password: registerData.password })

  return Future.of(createdUser.$loki)
}

/**
 * @param {{ email: string, password: string }} loginData
 */
export const userLogin = (loginData) => {
  const foundUser = models.Users.findOne({ email: loginData.email })

  if (!foundUser) {
    return Future.reject('not_found')
  }
  if (loginData.password !== foundUser.password) {
    return Future.reject('bad_credentials')
  }
  const createdToken = models.Tokens
    .insert({ userId: foundUser.$loki, token: createToken(USER_TOKEN_SIZE, '%') })

  return Future.of({ token: createdToken.token })
}

/**
 * @param {string} token
 */
export const userGet = (token) => {
  const foundToken = models.Tokens.findOne({ token })

  if (!foundToken) {
    return Future.reject('invalid_token')
  }

  const foundUser = models.Users.findOne({ $loki: foundToken.userId })

  if (!foundUser) {
    return Future.reject('invalid_token')
  }

  return Future.of(foundUser)
}

/**
 * @param {models.Users} user
 * @param {string?} token
 */
export const userSessionDrop = (user, token) => {
  if (token) {
    models.Tokens.findAndRemove({ token, userId: user.$loki })
  }
  else {
    models.Tokens.findAndRemove({ userId: user.$loki })
  }

  return Future.of(true)
}
