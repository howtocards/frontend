import { accountFetch, tokenSet } from '@features/common'
import { sessionApi } from '../api'


export const userLogin = ({ email, password }) => (
  async (dispatch) => {
    try {
      const { result, ok, error } = await dispatch(sessionApi.create, { email, password })

      if (ok) {
        await dispatch(tokenSet, result.token)
        await dispatch(accountFetch)
        return { ok, result }
      }

      return { ok, error }
    }
    catch (error) {
      return { ok: false, error: 'unknown_error' }
    }
  }
)
