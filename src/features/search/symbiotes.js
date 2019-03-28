import { createSymbiote } from "redux-symbiote"
import { initialFetching, createFetching } from "symbiote-fetching"

const initialState = {
  searchString: "",
  fetchingSearch: initialFetching,
  cardsIds: [],
}

const symbiotes = {
  setSearchString: (state, searchString) => ({ ...state, searchString }),
  fetchSearch: createFetching("fetchingSearch"),
  setCardsIds: (state, cardsIds) => ({
    ...state,
    cardsIds,
  }),
}

export const { actions, reducer } = createSymbiote(
  initialState,
  symbiotes,
  "search",
)
