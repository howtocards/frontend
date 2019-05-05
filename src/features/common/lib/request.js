// @flow
import { $baseUri } from "../model/config.store"
import { $token } from "../model/token"

type Method = "GET" | "POST" | "PUT" | "DELETE"

type Options = {
  headers?: { [key: string]: string },
  parse?: "text" | "json" | "noparse",
  baseUri?: string,
  body?: string | FormData | mixed,
}

/**
 * @param {"GET"|"POST"|"PUT"|"DELETE"} method
 * @param {string} url
 * @param {{ headers?: {}, body?: {}, parse?: 'text' | 'json' | 'noparse', baseUri?: string }} options
 */
export const request = (method: Method, url: string, options: Options = {}) => {
  const baseUri = $baseUri.getState()
  const token = $token.getState()

  const headers = new Headers({
    ...createContentType(options),
    ...createAuthorization(token),
    ...options.headers,
  })

  const uri = `${options.baseUri || baseUri}${url}`
  // eslint-disable-next-line no-unused-vars
  const { body, ...restOptions } = options

  const config = new Request(uri, {
    method,
    headers,
    ...restOptions,
    body: createBody(options, headers),
  })

  if (process.env.NODE_ENV === "development") {
    logRequest(config)
  }

  return fetch(config).then((response) => {
    if (options.parse === "text") {
      return response.text()
    }
    if (options.parse === "noparse") {
      return response
    }
    const contentType = response.headers.get("Content-Type")
    if (contentType && contentType.includes("json")) {
      return response.json().then(responseToPromise, responseToPromise)
    }
    throw new TypeError("Unexpected content-type")
  })
}

const createContentType = (options: Options) => {
  const header = contentTypeFromOptions(options)

  return header ? { "Content-Type": header } : {}
}

const createAuthorization = (token: ?string) =>
  token ? { Authorization: `bearer ${token}` } : {}

const contentTypeFromOptions = (options: Options) => {
  if (options && options.headers && options.headers["Content-Type"]) {
    return options.headers["Content-Type"]
  }

  if (options && options.body && options.body instanceof FormData) {
    return "multipart/form-data"
  }

  return typeof options.body === "object"
    ? "application/json"
    : (options.headers && options.headers["Content-Type"]) || ""
}

/**
 * @param {{ body?: {} }} options
 * @param {Headers} headers
 */
const createBody = (options, headers): FormData | string | void => {
  const contentType = headers.get("content-type")
  if (options.body && contentType && contentType.includes("json")) {
    return JSON.stringify(options.body)
  }
  if (options.body instanceof FormData) {
    return options.body
  }
  return undefined
}

/**
 * @param {Request} requestConfig
 */
const logRequest = (requestConfig) => {
  if (localStorage.getItem("api-debug")) {
    /* eslint-disable no-console */

    console.groupCollapsed(
      `API >> ${requestConfig.method} ${requestConfig.url}`,
    )
    console.log("request:", requestConfig)
    console.groupEnd()
    /* eslint-enable no-console */
  }
}

type ResponseOk<R> = {
  ok: true,
  result: R,
}

type ResponseError<E> = {
  ok: false,
  error: E,
}

type CustomResponse<R, E> = ResponseOk<R> | ResponseError<E>

// TODO: remove any (typed contracts?)
function responseToPromise<R, E>(response: CustomResponse<R, E>) {
  return response && typeof response.ok === "boolean"
    ? okToPromise(response)
    : response
}

function okToPromise<R, E>(response: CustomResponse<R, E>): Promise<R> {
  return response.ok
    ? Promise.resolve(response.result)
    : Promise.reject(response.error)
}
