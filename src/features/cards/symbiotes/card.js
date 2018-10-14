import { createSymbiote } from 'redux-symbiote'
import { initialFetching, createFetching } from 'symbiote-fetching'


const initialState = {
  card: null,
  fetching: initialFetching,
}

const symbiotes = {
  fetch: createFetching('fetching'),
  set: (state, card) => ({
    ...state,
    card,
  }),
}

export const { actions, reducer } = createSymbiote(initialState, symbiotes, 'card')
