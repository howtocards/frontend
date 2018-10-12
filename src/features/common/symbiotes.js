import { createSymbiote } from 'redux-symbiote'


const initialState = {
  baseUri: '/api',
  options: {},
}

const symbiotes = {
  setBaseUri: (state, uri) => ({ ...state, baseUri: uri }),
  setOptions: (state, options = {}) => ({ ...state, options }),
}

export const { actions, reducer } = createSymbiote(initialState, symbiotes, 'common')
