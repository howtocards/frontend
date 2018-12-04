import Cookies from 'browser-cookies'
import { handleFetching } from 'symbiote-fetching'

import { commonApi } from './api'
import { TOKEN_ID } from './request'
import { actions } from './symbiotes'


const unexpectedToken = 'UNEXPECTED_TOKEN'


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

export const accountFetch = () => handleFetching(actions.account.fetch, {
  async run(dispatch) {
    const { ok, result, error } = await dispatch(commonApi.account.getCurrent)

    if (ok) {
      dispatch(actions.account.set(result))
    }
    else if (error === 'invalid_token') {
      dispatch(tokenUnset)
    }
    else {
      throw unexpectedToken
    }
  },
})
