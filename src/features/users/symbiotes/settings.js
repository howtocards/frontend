import { createSymbiote } from "redux-symbiote"
import { initialFetching, createFetching } from "symbiote-fetching"

const initialState = {
  user: null,
  fetching: initialFetching,
}

const symbiotes = {
  fetch: createFetching("fetching"),
  setUserInfo: (state, { user }) => ({
    ...state,
    user,
  }),
}

export const { actions, reducer } = createSymbiote(
  initialState,
  symbiotes,
  "users/settings",
)
