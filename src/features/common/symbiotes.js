import { createSymbiote } from "redux-symbiote"
import { initialFetching, createFetching } from "symbiote-fetching"

const initialState = {
  baseUri: "/api",
  options: {},
  account: null,
  fetching: initialFetching,
}

const symbiotes = {
  setBaseUri: (state, uri) => ({ ...state, baseUri: uri }),
  setOptions: (state, options = {}) => ({ ...state, options }),
  account: {
    fetch: createFetching("fetching"),
    set: (state, account) => ({ ...state, account }),
    unset: (state) => ({ ...state, account: null }),
  },
}

export const { actions, reducer } = createSymbiote(
  initialState,
  symbiotes,
  "common",
)
