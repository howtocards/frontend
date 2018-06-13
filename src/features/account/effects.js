import Cookies from 'browser-cookies'
import { handleFetching } from 'symbiote-fetching'

import { actions } from './reducers'


const TOKEN_ID = 'hw-token'

export const tokenSet = (token) => () => {
  Cookies.set(TOKEN_ID, token)
}

export const tokenGet = () => () => Cookies.get(TOKEN_ID)

export const tokenUnset = () => () => {
  Cookies.erase(TOKEN_ID)
}

export const accountFetch = () => handleFetching(actions.fetch, {
  async run(dispatch, getState, { accountApi }) {
    const { ok, result, error } = await accountApi.getAccount()

    console.log({ ok, result, error })

    if (ok) {
      dispatch(actions.set(result.user))
    }
  },
})

export const accountReset = () => (
  (dispatch) => {
    dispatch(tokenUnset())
    dispatch(actions.unset())
  }
)
