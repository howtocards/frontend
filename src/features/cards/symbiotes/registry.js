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
    ...cards.reduce((accum, card) => {
      // eslint-disable-next-line no-param-reassign
      accum[card.id] = card
      return accum
    }, {}),
  }),
  setCard: (state, card) => ({
    ...state,
    [card.id]: { ...state[card.id], ...card },
  }),
  setUsefulMark: (state, { cardId, isUseful }) =>
    state[cardId]
      ? {
          ...state,
          [cardId]: {
            id: cardId,
            ...state[cardId],
            meta: { ...state[cardId].meta, isUseful },
          },
        }
      : state,
  delete: (state, cardId) =>
    state[cardId]
      ? {
          ...state,
          [cardId]: undefined,
        }
      : state,
}

export const { actions, reducer } = createSymbiote(
  initialState,
  symbiotes,
  "cards/registry",
)
