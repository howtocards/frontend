import { api } from 'features/common'

/**
 * Register.
 * Create user account.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#post-account-create-user-account
 * @param {{ email: string, password: string }} loginData
 * @return {Promise<{ result: number }>}
 */
export const accountCreate = (loginData) => (
  (
    api.post(
      '/account',
      loginData,
    )
  )
)

/**
 * Log in.
 * Create session token.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#post-accountsession-create-session-token
 * @param {{ email: string, password: string }} loginData
 * @return {Promise<{ result: { token: string } }>}
 */
export const tokenCreate = (loginData) => (
  (
    api.post(
      '/account/session',
      loginData,
    )
  )
)

/**
 * Remove single session token.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
 * @param {string} token
 * @return {Promise<{ result: boolean }>}
 */
export const tokenDrop = (token) => (
  (
    api.destroy(
      '/account/session',
      { token },
    )
  )
)

/**
 * Remove all session tokens.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
 * @return {Promise<{ result: boolean }>}
*/
export const sessionDrop = () => (
  (api.destroy('/account/session'))
)
