import { handleFetching } from 'symbiote-fetching'
import { actions } from './reducers'


export const fetchAccount = () => handleFetching(actions.fetch, {
  async run(dispatch, getState, { accountApi }) {
    const { ok, result, error } = await accountApi.getAccount()

    console.log({ ok, result, error })

    if (ok) {
      dispatch(actions.set(result.user))
    }
  },
})
