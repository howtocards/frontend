import { accountFetch, tokenSet } from 'features/account'
import { tokenCreate } from '../api'


export const userLogin = ({ email, password }) => (
  async (dispatch) => {
    try {
      const { result, ok } = await dispatch(tokenCreate, { email, password })

      if (ok) {
        await dispatch(tokenSet, result.token)
        await dispatch(accountFetch)
      }

      return ok
    }
    catch (error) {
      return false
    }
  }
)
