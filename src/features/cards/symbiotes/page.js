import { createSymbiote } from "redux-symbiote"
import { initialFetching, createFetching } from "symbiote-fetching"

export const initialState = {
  fetchingAll: initialFetching,
  fetchingOne: initialFetching,
  cardsIds: [],
}

const symbiotes = {
  fetchAll: createFetching("fetchingAll"),
  fetchOne: createFetching("fetchOne"),
  setCardsIds: (state, cardsIds) => ({
    ...state,
    cardsIds,
  }),
}

export const { actions, reducer } = createSymbiote(
  initialState,
  symbiotes,
  "cards/page",
)
