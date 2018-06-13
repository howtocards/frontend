import { accountFetch, tokenSet } from 'features/account'


export const userLogin = ({ email, password }) => (
  async (dispatch, getState, { api }) => {
    try {
      const { result, ok, error } = await api.join.createToken({ email, password })

      if (ok) {
        await dispatch(tokenSet(result.token))
        await dispatch(accountFetch())
      }

      return ok
    }
    catch (error) {
      return false
    }
  }
)
