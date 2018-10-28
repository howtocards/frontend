import { request } from './request'
import * as rpc from './rpc'


export const get = (url, options = {}) => (
  (dispatch) => dispatch(request, 'GET', url, options)
)

export const post = (url, body, options = {}) => (
  (dispatch) => dispatch(request, 'POST', url, { ...options, body })
)

export const put = (url, body, options = {}) => (
  (dispatch) => dispatch(request, 'PUT', url, { ...options, body })
)

export const patch = (url, body, options = {}) => (
  (dispatch) => dispatch(request, 'PATCH', url, { ...options, body })
)

export const destroy = (url, options = {}) => (
  (dispatch) => dispatch(request, 'DELETE', url, options)
)


export const api = {
  account: {
    /**
     * Get info about current account.
     * https://github.com/howtocards/frontend/tree/master/mock-server/server#get-account-user-account-status
     * @return {Promise<{ user: { email: string } }>}
     */
    getCurrent: () => rpc.send('account::get_current'),
  },
}

/**
 * Get info about current account.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#get-account-user-account-status
 * @return {Promise<{ user: { email: string } }>}
 */
export const accountFetch = () => (
  (dispatch) => dispatch(get, '/account/session/')
)
