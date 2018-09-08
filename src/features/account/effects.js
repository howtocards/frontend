import Cookies from 'browser-cookies'
import { handleFetching } from 'symbiote-fetching'

import { api } from 'features/common'
import * as accountsApi from './api'
import { actions } from './symbiotes'


const unexpectedToken = 'UNEXPECTED_TOKEN'


export const tokenSet = (token) => () => {
  Cookies.set(api.TOKEN_ID, token)
}

export const tokenGet = () => () => Cookies.get(api.TOKEN_ID)

export const tokenUnset = () => () => {
  Cookies.erase(api.TOKEN_ID)
}

export const accountFetch = () => handleFetching(actions.fetch, {
  async run(dispatch) {
    const { ok, result } = await dispatch(accountsApi.accountFetch)

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
    dispatch(tokenUnset)
    dispatch(actions.unset())
  }
)
