import { handleFetching } from "symbiote-fetching"

import { api } from "@features/common"
import { usersApi } from "./api"
import { actions as currentActions } from "./symbiotes/current"

/**
 * @param {number} userId
 */
export const getUserWithCards = (userId) =>
  handleFetching(currentActions.fetch, {
    noThrow: true,
    async run(dispatch) {
      const { user } = await dispatch(getUser, userId)
      const [{ cards: useful }, { cards: created }] = await dispatch(
        getCardsFor,
        userId,
      )

      dispatch(currentActions.set({ user, useful, created }))

      return { user, useful, created }
    },
  })

const getCardsFor = (userId) => (dispatch) => {
  const usefulCardsP = dispatch(usersApi.getUsefulCardsFor, userId)
    .then(api.okToPromise)
    .catch(() => [])
  const createdCardsP = dispatch(usersApi.getCardsCreatedBy, userId)
    .then(api.okToPromise)
    .catch(() => [])

  return Promise.all([usefulCardsP, createdCardsP])
}

export const getUser = (userId) => (dispatch) =>
  dispatch(usersApi.getInfo, userId).then(api.okToPromise)
