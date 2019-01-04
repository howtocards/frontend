import { handleFetching } from "symbiote-fetching"

import { api } from "@features/common"
import { registryActions } from "@features/cards"

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
      const [useful, created] = await dispatch(getCardsFor, userId)

      dispatch(registryActions.mergeById(useful.concat(created)))
      dispatch(
        currentActions.set({
          user,
          useful: useful.map((c) => c.id),
          created: created.map((c) => c.id),
        }),
      )

      return { user, useful, created }
    },
  })

const getCardsFor = (userId) => (dispatch) => {
  const usefulCardsP = dispatch(usersApi.getUsefulCardsFor, userId)
    .then(api.okToPromise)
    .then(({ cards }) => cards)
    .catch(() => [])
  const createdCardsP = dispatch(usersApi.getCardsCreatedBy, userId)
    .then(api.okToPromise)
    .then(({ cards }) => cards)
    .catch(() => [])

  return Promise.all([usefulCardsP, createdCardsP])
}

export const getUser = (userId) => (dispatch) =>
  dispatch(usersApi.getInfo, userId).then(api.okToPromise)
