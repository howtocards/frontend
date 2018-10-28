import { handleFetching } from 'symbiote-fetching'
import { cardsApi } from './api'
import { actions } from './symbiotes'


export const letterCreate = ({ title, content }) => (
  async (dispatch) => {
    try {
      const { result, ok, error } = await dispatch(cardsApi.create, { title, content })

      return { ok, error, result }
    }
    catch (error) {
      return { ok: false, error: String(error) }
    }
  }
)


export const getAllCards = () => handleFetching(actions.fetch, {
  async run(dispatch) {
    const { ok, result, error } = await dispatch(cardsApi.getLatest)

    if (ok) {
      dispatch(actions.set(result))
    }
    else {
      throw new Error('[X] - An error occurred while getting the data', error)
    }
  },
})
