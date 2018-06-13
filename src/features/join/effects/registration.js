

export const userRegister = ({ email, password }) => (
  async (dispatch, getState, { api }) => {
    try {
      const { result, ok, error } = await api.join.createAccount({ email, password })

      return { ok, error }
    }
    catch (error) {
      return { ok: false, error: 'Unknown error' }
    }
  }
)

