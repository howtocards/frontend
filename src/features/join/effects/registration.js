import { accountApi } from "../api"

export const userRegister = ({ email, password }) => async (dispatch) => {
  try {
    const { /* result, */ ok, error } = await dispatch(accountApi.create, {
      email,
      password,
    })

    return { ok, error }
  } catch (error) {
    return { ok: false, error: "unknown_error" }
  }
}
