import { handleFetching } from "symbiote-fetching"
import { push } from "connected-react-router"
import { accountIdSelector } from "@features/common"
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

export const mergeUsefulToCard = (card) => ({ ok, result }) => ({
  ...card,
  isUseful: ok ? result.isUseful : false,
})

export const mergeCanEditToCard = (accountId) => (card) => ({
  ...card,
  canEdit: accountId === card.authorId,
})

export const getAllCards = () =>
  handleFetching(page.fetchAll, {
    noThrow: true,
    async run(dispatch, getState) {
      const { ok, result, error } = await dispatch(cardsApi.getLatest)
      const accountId = accountIdSelector(getState())

      if (ok) {
        const list = await Promise.all(
          result.map((card) =>
            dispatch(getUsefulMark, card.id)
              .then(mergeUsefulToCard(card))
              .then(mergeCanEditToCard(accountId)),
          ),
        )

        dispatch(registry.mergeById(list))
        dispatch(page.setCardsIds(list.map((i) => i.id)))
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
  const isUseful = !card.isUseful
  const prom = dispatch(cardsApi.markUseful, cardId, isUseful)

  dispatch(registry.setUsefulMark({ cardId, isUseful }))

  try {
    const { ok, error, result } = await prom

    if (!ok) {
      throw new Error(error)
    }
    dispatch(registry.setCard(result.card))
  } catch (error) {
    // Rollback
    dispatch(registry.setUseful({ cardId, isUseful: !isUseful }))
  }
}

export const getUsefulMark = (cardId) => (dispatch) =>
  dispatch(cardsApi.isUseful, cardId)
