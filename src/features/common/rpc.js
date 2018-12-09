import nanoid from "nanoid"
import { request } from "./request"

const ID_LENGTH = 21

const newId = () => nanoid(ID_LENGTH)
const rpcUrl = (method) =>
  process.env.NODE_ENV === "production" ? "/rpc" : `/rpc?__m=${method}`

const make = (url, body) => request("POST", url, body)

export const send = (method, params = {}, id = newId()) => (dispatch) =>
  dispatch(make, rpcUrl(method), { method, params, id })

/**
 * @param {Array<Function>} requests
 */
export const batch = (requests) => (dispatch) => {
  /**
   * @type {Array<{ method, params, id }>}
   */
  const requestsPayload = requests.map((effect) => {
    let payload = null

    effect((makeEffect, url, rpcPayload) => {
      payload = rpcPayload
    })

    return payload
  })

  const url = rpcUrl(requestsPayload.map((p) => p.method).join(","))

  return dispatch(make, url, requestsPayload)
}
