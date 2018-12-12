import { request, TOKEN_ID } from "./request"
import { get, post, put, patch, destroy, okToPromise } from "./api"
import * as rpc from "./rpc"

// TODO remove old api. Use rpc
export const api = {
  request,
  get,
  post,
  put,
  patch,
  destroy,
  okToPromise,
  TOKEN_ID,
}

export { rpc }
export { NotFoundPage } from "./pages/not-found"
export { reducer as commonReducer } from "./symbiotes"
export { commonApiSelector } from "./selectors"
export { CommonContentTemplate } from "./templates"
export { tokenSet, accountFetch, accountReset } from "./effects"
export { Header, AccountLoader, Authenticated } from "./organisms"
