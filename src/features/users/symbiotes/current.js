import { createSymbiote } from "redux-symbiote"
import { initialFetching, createFetching } from "symbiote-fetching"

const initialState = {
  model: null,
  useful: [],
  created: [],
  fetching: initialFetching,
}

const symbiotes = {
  fetch: createFetching("fetching"),
  set: (state, { user, useful, created }) => ({
    ...state,
    model: user,
    useful,
    created,
  }),
  reset: (state) => ({ ...state, model: null, useful: [], created: [] }),
}

export const { actions, reducer } = createSymbiote(
  initialState,
  symbiotes,
  "users/current",
)
