import { api } from 'features/common'


/**
 * @param {{ title: string, content: string }} cardData
 * @return {Promise<{ result: { id: number, title: string, content: string } }>}
 */
export const cardCreate = (cardData) => (
  (dispatch) => dispatch(
    api.post,
    '/cards',
    cardData,
  )
)


/**
 * @return {Promise<{ result: Array<{id: number, content: string, created: number, author_id: string, title: string}>}>}
 */

export const cardsGet = () => (
  (dispatch) => dispatch(
    api.get,
    '/cards',
  )
)

/**
 * @return {Promise<{result: Array<{id: number, content: string, created: number, author_id: string, title: string}>}>}
 */

export const cardRead = (id) => (
  (dispatch) => dispatch(
    api.get,
    `/cards/${id}`,
  )
)
