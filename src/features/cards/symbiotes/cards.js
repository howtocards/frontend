import { createSymbiote } from "redux-symbiote"
import { initialFetching, createFetching } from "symbiote-fetching"

const initialState = {
  cards: null,
  fetching: initialFetching,
}

const symbiotes = {
  fetch: createFetching("fetching"),
  set: (state, cards) => ({ ...state, cards }),
  setUseful: (state, { cardId, isUseful }) => ({
    ...state,
    cards: state.cards
      ? state.cards.map((card) =>
          card.id === cardId ? { ...card, isUseful } : card,
        )
      : [],
  }),
}

export const { actions, reducer } = createSymbiote(
  initialState,
  symbiotes,
  "cards",
)
