import { handleFetching } from "symbiote-fetching"
import { cardsApi } from "./api"
import { actions as cardsActions } from "./symbiotes/cards"
import { actions as cardActions } from "./symbiotes/card"

export const letterCreate = ({ title, content }) => async (dispatch) => {
  try {
    const { result, ok, error } = await dispatch(cardsApi.create, {
      title,
      content,
    })

    return { ok, error, result }
  } catch (error) {
    return { ok: false, error: String(error) }
  }
}

export const getAllCards = () =>
  handleFetching(cardsActions.fetch, {
    async run(dispatch) {
      const { ok, result, error } = await dispatch(cardsApi.getLatest)

      if (ok) {
        dispatch(cardsActions.set(result))
      } else {
        throw new Error("[X] - An error occurred while getting the data", error)
      }
    },
  })

export const cardRead = (id) =>
  handleFetching(cardActions.fetch, {
    async run(dispatch) {
      const { ok, result, error } = await dispatch(cardsApi.getById, id)

      if (ok) {
        dispatch(cardActions.set(result.card))
      } else {
        throw new Error("[X] - An error occurred while getting the data", error)
      }
    },
  })
