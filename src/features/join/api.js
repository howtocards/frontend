import { api } from '@features/common'


export const accountApi = {
  /**
   * Register.
   * Create user account.
   * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#post-account-create-user-account
   * @param {{ email: string, password: string }} registerData
   * @return {Promise<{ result: number }>}
   */
  create: (registerData) => api.post('/account/', registerData),
}

export const sessionApi = {
  /**
   * Log in.
   * Create session token.
   * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#post-accountsession-create-session-token
   * @param {{ email: string, password: string }} loginData
   * @return {Promise<{ result: { token: string } }>}
   */
  create: (loginData) => api.post('/account/session/', loginData),

  /**
   * Remove single session token.
   * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
   * @param {string} token
   * @return {Promise<{ result: boolean }>}
   */
  drop: (token) => api.destroy('/account/session/', { token }),

  /**
   * Remove all session tokens.
   * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
   * @return {Promise<{ result: boolean }>}
   */
  clear: () => api.destroy('/account/session/'),
}
