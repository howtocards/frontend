import { handleFetching } from "symbiote-fetching"
import { push } from "connected-react-router"
import { registryActions } from "@features/cards"
import { actions as search } from "./symbiotes"
import { searchApi } from "./api"

export const getSearchResults = (params) =>
  handleFetching(search.fetchSearch, {
    noThrow: true,
    async run(dispatch, getState) {
      const query = params.get("q")
      const { searchString } = getState().search
      const { ok, result, error } = await dispatch(searchApi.search, query)

      if (ok) {
        dispatch(registryActions.mergeById(result.cards))
        dispatch(search.setCardsIds(result.cards.map((i) => i.id)))

        if (searchString !== query) {
          dispatch(push(`/search?${params}`))
        }
      } else {
        throw new Error(error)
      }
    },
  })
