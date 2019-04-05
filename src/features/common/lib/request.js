import { $baseUri } from "../model/config.store"
import { $token } from "../model/token"

/**
 * @param {"GET"|"POST"|"PUT"|"DELETE"} method
 * @param {string} url
 * @param {{ headers?: {}, body?: {}, parse?: 'text' | 'json' | 'noparse', baseUri?: string }} options
 */
export const request = (method, url, options = {}) => {
  const baseUri = $baseUri.getState()
  const token = $token.getState()

  const headers = new Headers({
    ...createContentType(options),
    ...createAuthorization(token),
    ...options.headers,
  })

  const uri = `${options.baseUri || baseUri}${url}`

  const config = new Request(uri, {
    method,
    headers,
    ...options,
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

const createContentType = (options) => {
  const header = contentTypeFromOptions(options)

  return header ? { "Content-Type": header } : {}
}

const createAuthorization = (token) =>
  token ? { Authorization: `bearer ${token}` } : {}

const contentTypeFromOptions = (options) => {
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
const createBody = (options, headers) => {
  if (options.body && headers.get("content-type").includes("json")) {
    return JSON.stringify(options.body)
  }
  return options.body
}

/**
 * @param {Request} requestConfig
 */
const logRequest = (requestConfig) => {
  if (localStorage.getItem("api-debug")) {
    /* eslint-disable no-console */
    const group = `API >> ${requestConfig.method} ${requestConfig.url}`

    console.groupCollapsed(group)
    console.log("request:", requestConfig)
    console.groupEnd(group)
    /* eslint-enable no-console */
  }
}

const responseToPromise = (response) =>
  response && typeof response.ok === "boolean"
    ? okToPromise(response)
    : response

const okToPromise = ({ ok, result, error }) =>
  ok ? Promise.resolve(result) : Promise.reject(error)
