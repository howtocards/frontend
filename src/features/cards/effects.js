import { handleFetching } from 'symbiote-fetching'
import * as cardsApi from './api'
import { actions as cardsActions } from './symbiotes/cards'
import { actions as CardActions } from './symbiotes/card'


export const letterCreate = ({ title, content }) => (
  async (dispatch) => {
    try {
      const { result, ok, error } = await dispatch(cardsApi.cardCreate, { title, content })

      return { ok, error, result }
    }
    catch (error) {
      return { ok: false, error: String(error) }
    }
  }
)

export const getAllCards = () => handleFetching(cardsActions.fetch, {
  async run(dispatch) {
    const { ok, result, error } = await dispatch(cardsApi.cardsGet)

    if (ok) {
      dispatch(cardsActions.set(result))
    }
    else {
      throw new Error('[X] - An error occurred while getting the data', error)
    }
  },
})

export const cardRead = (id) => handleFetching(CardActions.fetch, {
  async run(dispatch) {
    const { ok, result, error } = await dispatch(cardsApi.cardRead, id)

    if (ok) {
      dispatch(CardActions.set(result))
    }
    else {
      throw new Error('[X] - An error occurred while getting the data', error)
    }
  },
})
