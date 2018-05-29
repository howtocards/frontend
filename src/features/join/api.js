// eslint-disable-next-line no-unused-vars
import { Api } from 'request-api'


export class JoinApi {
  /**
   * @param {Api} api
   */
  constructor(api) {
    this.api = api
  }

  /**
   * Register.
   * Create user account.
   * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#post-account-create-user-account
   * @param {{ email: string, password: string }} loginData
   * @return {Promise<{ result: number }>}
   */
  createAccount(loginData) {
    return this.api.post('/account', loginData)
  }

  /**
   * Log in.
   * Create session token.
   * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#post-accountsession-create-session-token
   * @param {{ email: string, password: string }} loginData
   * @return {Promise<{ result: { token: string } }>}
   */
  createToken(loginData) {
    return this.api.post('/account/session', loginData)
  }

  /**
   * Remove all session tokens.
   * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
   * @return {Promise<{ result: boolean }>}
   */
  dropSession() {
    return this.api.delete('/account/session')
  }

  /**
   * Remove single session token.
   * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
   * @param {string} token
   * @return {Promise<{ result: boolean }>}
   */
  dropToken(token) {
    return this.api.delete('/account/session', { token })
  }
}
