import * as api from './api'


export const letterCreate = ({ title, content }) => (
  async (dispatch) => {
    try {
      const { result, ok, error } = await dispatch(api.cardCreate, { title, content })

      return { ok, error, result }
    }
    catch (error) {
      return { ok: false, error: String(error) }
    }
  }
)

export const getAllCards = () => (
  async (dispatch) => {
    try {
      const { result, ok, error } = await dispatch(api.cardsGet)

      return { ok, error, result }
    }
    catch (error) {
      return { ok: false, error: String(error) }
    }
  }
)
