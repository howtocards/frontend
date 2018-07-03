import { accountCreate } from '../api'


export const userRegister = async ({ email, password }) => {
  try {
    const { result, ok, error } = await accountCreate({ email, password })

    return { ok, error }
  }
  catch (error) {
    return { ok: false, error: 'Unknown error' }
  }
}

