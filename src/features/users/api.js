import { request } from "@features/common"

/**
 * Get info about user
 */
const getInfo = (userId) => request("GET", `/users/${userId}/`)

/**
 * Get useful cards for user
 */
const getUsefulCardsFor = (userId) =>
  request("GET", `/users/${userId}/cards/useful/`)

/**
 * Get cards created by user
 */
const getCardsCreatedBy = (userId) =>
  request("GET", `/users/${userId}/cards/authors/`)

/**
 * @see https://documenter.getpostman.com/view/6101539/RzfiGTRx#409d7cc1-252a-48c8-bd32-bc373879adc5
 */
export const usersApi = {
  getInfo,
  getUsefulCardsFor,
  getCardsCreatedBy,
}
