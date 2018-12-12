import { createSymbiote } from "redux-symbiote"
import { initialFetching, createFetching } from "symbiote-fetching"

const initialState = {
  model: null,
  fetching: initialFetching,
}

const symbiotes = {
  fetch: createFetching("fetching"),
  set: (state, user) => ({ ...state, model: user }),
  reset: (state) => ({ ...state, model: null }),
}

export const { actions, reducer } = createSymbiote(
  initialState,
  symbiotes,
  "users/current",
)
