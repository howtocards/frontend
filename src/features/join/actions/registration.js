import Cookies from 'browser-cookies'


export const registerUser = ({ email, password }) => (
  async (dispatch, getState, { joinApi }) => {
    try {
      const { result, ok, error } = await joinApi.createAccount({ email, password })

      return { ok, error }
    }
    catch (error) {
      return { ok: false, error: 'Unknown error' }
    }
  }
)

export const loginUser = ({ email, password }) => (
  async (dispatch, getState, { joinApi }) => {
    try {
      const { result, ok, error } = await joinApi.createToken({ email, password })

      if (ok) {
        Cookies.set('hw-token', result.token)
      }

      return ok
    }
    catch (error) {
      return false
    }
  }
)
