
import { api } from 'features/common'


/**
 * Get info about current account.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#get-account-user-account-status
 * @return {Promise<{ user: { email: string } }>}
 */
export const accountFetch = () => (
  (dispatch) => dispatch(api.get, '/account')
)
