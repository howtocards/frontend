import { createSymbiote } from 'redux-symbiote'
import { initialFetching, createFetching } from 'symbiote-fetching'


const initialState = {
  card: null,
  fetching: initialFetching,
}

export const { actions, reducer } = createSymbiote(initialState, {
  fetch: createFetching('fetching'),
  set: (state, card) => ({ ...state, card }),
}, 'card')
