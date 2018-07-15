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
