import { createSymbiote } from 'redux-symbiote'


const initialState = {
  baseUri: '/api',
  options: {},
}

export const { actions, reducer } = createSymbiote(initialState, {
  setBaseUri: (state, uri) => ({ ...state, baseUri: uri }),
  setOptions: (state, options = {}) => ({ ...state, options }),
}, 'common')
