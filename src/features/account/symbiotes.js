import { createSymbiote } from 'redux-symbiote'
import { initialFetching, createFetching } from 'symbiote-fetching'


const initialState = {
  account: null,
  fetching: initialFetching,
}

const symbiotes = {
  fetch: createFetching('fetching'),
  set: (state, account) => ({ ...state, account }),
  unset: (state) => ({ ...state, account: null }),
}

export const { actions, reducer } = createSymbiote(initialState, symbiotes, 'account')
