import { tokenChanged as tokenSet } from "@features/common"
import { sessionApi } from "../api"

const accountFetch = () => () => console.warn("IMPLEMENT ACCOUNT FETCH")

export const userLogin = ({ email, password }) => async (dispatch) => {
  try {
    const { result, ok, error } = await dispatch(sessionApi.createSession, {
      email,
      password,
    })

    if (ok) {
      await dispatch(tokenSet, result.token)
      await dispatch(accountFetch)
      return { ok, result }
    }

    return { ok, error }
  } catch (error) {
    return { ok: false, error: "unknown_error" }
  }
}
