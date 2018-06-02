

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

