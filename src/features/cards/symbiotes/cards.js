import { createSymbiote } from "redux-symbiote"
import { initialFetching, createFetching } from "symbiote-fetching"

const initialState = {
  cards: null,
  fetching: initialFetching,
}

export const { actions, reducer } = createSymbiote(
  initialState,
  {
    fetch: createFetching("fetching"),
    set: (state, cards) => ({ ...state, cards }),
  },
  "cards",
)
