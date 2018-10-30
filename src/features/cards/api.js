import { api } from '@features/common'


export const cardsApi = {
  /**
   * @param {{ title: string, content: string }} cardData
   * @return {Promise<{ result: { id: number, title: string, content: string } }>}
   */
  create: (cardData) => api.post('/cards/', cardData),

  /**
   * @return {Promise<{ result: Array<{content: string, created: number, author_id: string, title: string}> }>}
   */
  getLatest: () => api.get('/cards/'),
}
