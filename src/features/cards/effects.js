import { handleFetching } from "symbiote-fetching"
import { push } from "connected-react-router"

import { cardsApi } from "./api"
import { actions as page } from "./symbiotes/page"
import { actions as registry } from "./symbiotes/registry"
import { cardsRegistrySelector } from "./selectors"

export const cardCreate = ({ title, content }) => async (dispatch) => {
  try {
    const { result, ok, error } = await dispatch(cardsApi.create, {
      title,
      content,
    })

    dispatch(push("/"))
    return { ok, error, result }
  } catch (error) {
    return { ok: false, error: String(error) }
  }
}

export const cardEdit = ({ id, title, content }) => async (dispatch) => {
  try {
    const { result, ok, error } = await dispatch(cardsApi.edit, {
      id,
      title,
      content,
    })

    dispatch(push("/"))
    return { ok, error, result }
  } catch (error) {
    return { ok: false, error: String(error) }
  }
}

export const getAllCards = () =>
  handleFetching(page.fetchAll, {
    noThrow: true,
    async run(dispatch) {
      const { ok, result, error } = await dispatch(cardsApi.getLatest)

      if (ok) {
        dispatch(registry.mergeById(result))
        dispatch(page.setCardsIds(result.map((i) => i.id)))
      }

      throw new Error(error)
    },
  })

export const fetchFullCard = (id) =>
  handleFetching(page.fetchOne, {
    noThrow: true,
    async run(dispatch) {
      const { ok, result, error } = await dispatch(cardsApi.getById, id)

      if (ok) {
        dispatch(registry.setCard(result.card))
      }

      throw new Error(error)
    },
  })

export const setUsefulMark = (cardId) => async (dispatch, getState) => {
  const card = cardsRegistrySelector(getState())[cardId]
  const isUseful = !card.meta.isUseful
  const prom = dispatch(cardsApi.markUseful, cardId, isUseful)

  dispatch(registry.setUsefulMark({ cardId, isUseful }))

  try {
    const { ok, error, result } = await prom

    if (!ok) {
      throw new Error(error)
    }
    dispatch(registry.setCard(result.card))
  } catch (_error) {
    // Rollback
    dispatch(registry.setUsefulMark({ cardId, isUseful: !isUseful }))
  }
}
