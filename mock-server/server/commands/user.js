import { Result } from '@es2/option-result'
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
 * @return {Promise<Result<number, string>>}
 */
export const userRegister = async (registerData) => {
  if (models.Users.chain().find({ email: registerData.email }).count()) {
    return Result.Err('already_exists')
  }

  const user = models.Users.insert({ email: registerData.email, password: registerData.password })

  return Result.Ok(user.$loki)
}

/**
 * @param {{ email: string, password: string }} loginData
 * @return {Promise<Result<string, string>>}
 */
export const userLogin = async (loginData) => {
  const found = models.Users.findOne({ email: loginData.email })

  if (!found) {
    return Result.Err('not_found')
  }
  if (loginData.password !== found.password) {
    return Result.Err('bad_credentials')
  }
  const token = models.Tokens.insert({ userId: found.$loki, token: createToken(USER_TOKEN_SIZE, '%') })

  return Result.Ok({ token: token.token })
}

/**
 * @param {string} token
 * @return {Promise<Result<User, string>>}
 */
export const userGet = async (token) => {
  const found = models.Tokens.findOne({ token })

  if (!found) {
    return Result.Err('invalid_token')
  }

  const user = models.Users.findOne({ $loki: found.userId })

  if (!user) {
    return Result.Err('invalid_token')
  }

  return Result.Ok(user)
}

/**
 * @param {models.Users} user
 * @param {string?} token
 * @return {Promise<Result<boolean, string>>}
 */
export const userSessionDrop = async (user, token) => {
  if (token) {
    models.Tokens.findAndRemove({ token, userId: user.$loki })
  }
  else {
    models.Tokens.findAndRemove({ userId: user.$loki })
  }

  return Result.Ok(true)
}
