// eslint-disable-next-line no-unused-vars
import { Api } from 'request-api'


export class AccountApi {
  /**
   * @param {Api} api
   */
  constructor(api) {
    this.api = api
  }

  /**
   * Get info about current account.
   * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#get-account-user-account-status
   * @return {Promise<{ user: { email: string } }>}
   */
  getAccount() {
    return this.api.get('/account')
  }
}
