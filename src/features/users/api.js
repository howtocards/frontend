import { api } from "@features/common"

/**
 * @see https://documenter.getpostman.com/view/6101539/RzfiGTRx#409d7cc1-252a-48c8-bd32-bc373879adc5
 */
export const usersApi = {
  /**
   * Get info about user
   */
  getInfo: (userId) => api.get(`/users/${userId}/`),

  /**
   * Get useful cards for user
   */
  getUsefulCardsFor: (userId) => api.get(`/users/${userId}/cards/useful/`),

  /**
   * Get cards created by user
   */
  getCardsCreatedBy: (userId) => api.get(`/users/${userId}/cards/authors/`),
}
