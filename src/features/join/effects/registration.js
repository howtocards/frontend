import { accountCreate } from '../api'


export const userRegister = ({ email, password }) => (
  async (dispatch) => {
    try {
      const { /* result, */ ok, error } = await dispatch(accountCreate, { email, password })

      return { ok, error }
    }
    catch (error) {
      return { ok: false, error: 'unknown_error' }
    }
  }
)
