import { createSymbiote } from 'redux-symbiote'
import { initialFetching, createFetching } from 'symbiote-fetching'


const initialState = {
  account: null,
  fetching: initialFetching,
}

export const { actions, reducer } = createSymbiote(initialState, {
  fetch: createFetching('fetching'),
  set: (state, account) => ({ ...state, account }),
  unset: (state) => ({ ...state, account: null }),
}, 'account')
