// eslint-disable-next-line no-unused-vars
import { Requester } from 'request-api'


export class CardsApi {
  static apiName = 'cards'
  /**
   * @param {Requester} api
   */
  constructor(api) {
    this.api = api
  }
}
