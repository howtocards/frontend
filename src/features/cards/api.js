import { api } from "@features/common"

export const cardsApi = {
  /**
   * @param {{ title: string, content: string }} cardData
   * @return {Promise<{ result: { id: number, title: string, content: string } }>}
   */
  create: (cardData) => api.post("/cards/", cardData),

  /**
   * @param {{ title: string, content: string }} cardData
   */
  edit: (id, cardData) => api.put(`/cards/${id}/`, cardData),

  /**
   * @return {Promise<{ result: Array<{content: string, created: number, author_id: string, title: string}> }>}
   */
  getLatest: () => api.get("/cards/"),

  /**
   * @return {Promise<{result: Array<{id: number, content: string, created: number, author_id: string, title: string}>}>}
   */
  getById: (id) => api.get(`/cards/${id}/`),

  /**
   * @return {Promise<{ result: { isUseful: boolean } }>}
   */
  isUseful: (cardId) => api.get(`/cards/${cardId}/useful/`),

  markUseful: (cardId, isUseful) =>
    api.post(`/cards/${cardId}/useful/`, { isUseful }),
}
