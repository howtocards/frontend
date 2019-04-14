import { request } from "@features/common"

/**
 * @param {{ title: string, content: string }} cardData
 * @return {Promise<{ result: { id: number, title: string, content: string } }>}
 */
const create = (cardData) => request("POST", "/cards/", { body: cardData })

/**
 * @param {{ id: number, title: string, content: string }} cardData
 */
const edit = (card) => request("PUT", `/cards/${card.id}/`, { body: card })

/**
 * @return {Promise<{ result: Array<{content: string, created: number, author_id: string, title: string}> }>}
 */
const getLatest = () => request("GET", "/cards/")

/**
 * @return {Promise<{result: Array<{id: number, content: string, created: number, author_id: string, title: string}>}>}
 */
const getById = (id) => request("GET", `/cards/${id}/`)

/**
 * @param {number} cardId
 * @param {boolean} isUseful
 */
const markUseful = (cardId, isUseful) =>
  request("POST", `/cards/${cardId}/useful/`, { body: { isUseful } })

export const cardsApi = {
  create,
  edit,
  getLatest,
  getById,
  markUseful,
}
