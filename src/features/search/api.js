import { api } from "@features/common"

export const searchApi = {
  /**
   * @param {string} cardData
   * @return {Promise<{ result: { cards: Array<{ id: number, title: string, content: string }> } }>}
   */
  search: (query) => api.get(`/search/?q=${query}`),
}
