import Cookies from 'browser-cookies'
import { handleFetching } from 'symbiote-fetching'

import * as api from './api'
import { TOKEN_ID } from './request'
import { actions } from './symbiotes'


const unexpectedToken = 'UNEXPECTED_TOKEN'


export const accountFetch = () => handleFetching(actions.account.fetch, {
  async run(dispatch) {
    const { ok, result } = await dispatch(api.accountFetch)

    if (ok) {
      dispatch(actions.account.set(result))
    }
    else {
      throw unexpectedToken
    }
  },
})

export const tokenSet = (token) => () => {
  Cookies.set(TOKEN_ID, token)
}

export const tokenGet = () => () => Cookies.get(TOKEN_ID)

export const tokenUnset = () => () => {
  Cookies.erase(TOKEN_ID)
}

export const accountReset = () => (
  (dispatch) => {
    dispatch(tokenUnset)
    dispatch(actions.account.unset())
  }
)
