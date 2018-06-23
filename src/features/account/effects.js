import Cookies from 'browser-cookies'
import { handleFetching } from 'symbiote-fetching'

import { actions } from './reducers'


const unexpectedToken = 'UNEXPECTED_TOKEN'
const TOKEN_ID = 'hw-token'

export const tokenSet = (token) => () => {
  Cookies.set(TOKEN_ID, token)
}

export const tokenGet = () => () => Cookies.get(TOKEN_ID)

export const tokenUnset = () => () => {
  Cookies.erase(TOKEN_ID)
}

export const accountFetch = () => handleFetching(actions.fetch, {
  async run(dispatch, getState, { api }) {
    const { ok, result, error } = await api.account.getAccount()

    if (ok) {
      dispatch(actions.set(result.user))
    }
    else {
      throw unexpectedToken
    }
  },
})

export const accountReset = () => (
  (dispatch) => {
    dispatch(tokenUnset())
    dispatch(actions.unset())
  }
)
