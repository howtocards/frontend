import { createSymbiote } from "redux-symbiote"

const initialState = {}

const symbiotes = {
  reset: () => initialState,
  merge: (state, cards) => ({
    ...state,
    ...cards,
  }),
  mergeById: (state, cards) => ({
    ...state,
    ...cards.reduce((p, card) => {
      // eslint-disable-next-line no-param-reassign
      p[card.id] = card
      return p
    }, {}),
  }),
  setCard: (state, card) => ({
    ...state,
    [card.id]: { ...state[card.id], ...card },
  }),
  setUsefulMark: (state, { cardId, isUseful }) => ({
    ...state,
    [cardId]: { ...state[cardId], isUseful },
  }),
  delete: (state, cardId) => ({
    ...state,
    [cardId]: undefined,
  }),
}

export const { actions, reducer } = createSymbiote(
  initialState,
  symbiotes,
  "cards/registry",
)
