const { Result } = require('@es2/option-result')
const { models } = require('../models')


const createToken = (iterations = 3, sep = '') => {
  let cnt = 0
  const result = []

  while (cnt++ < iterations) {
    result.push(Math.floor(Math.random() * 100000000000).toString(36))
  }

  return result.join(sep)
}

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
  const token = models.Tokens.insert({ userId: found.$loki, token: createToken(5, '%') })

  return Result.Ok({ token: token.token })
}
