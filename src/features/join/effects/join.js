import { accountFetch, tokenSet } from 'features/account'
import { tokenCreate } from '../api'


export const userLogin = async ({ email, password }) => {
  try {
    const { result, ok, error } = await tokenCreate({ email, password })

    if (ok) {
      await tokenSet(result.token)
      await accountFetch()
    }

    return ok
  }
  catch (error) {
    return false
  }
}
