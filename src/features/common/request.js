import Cookies from "browser-cookies"
import { commonApiSelector } from "./selectors"

export const TOKEN_ID = "hw-token"

/**
 * @param {string} method
 * @param {string} url
 * @param {{ baseUri?: string, headers?: {}, body?: {}, parse?: 'text' | 'json' | 'noparse' }} options
 */
export const request = (method, url, options = {}) => (dispatch, getState) => {
  const { baseUri, options: defaultOptions } = commonApiSelector(getState())
  const token = Cookies.get(TOKEN_ID)

  const headers = new Headers({
    ...defaultOptions.headers,
    ...createContentType(options),
    ...createAuthorization(token),
    ...options.headers,
  })

  const defaultBaseUrl = `${document.location.origin}${baseUri}`

  const uri = new URL(url, options.baseUri || defaultBaseUrl)

  const config = new Request(uri, {
    method,
    headers,
    ...defaultOptions,
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
    if (response.headers.get("Content-Type").includes("json")) {
      return response.json()
    }
    throw new TypeError("Unexpected content-type")
  })
}

const createContentType = (options) => {
  const header = contentTypeFromOptions(options)

  return header ? { "Content-Type": header } : {}
}

const contentTypeFromOptions = (options) =>
  typeof options.body === "object"
    ? "application/json"
    : options.headers && options.headers["Content-Type"]

const createAuthorization = (token) =>
  token ? { Authorization: `bearer ${token}` } : {}

/**
 * @param {{ body?: {} }} options
 * @param {Headers} headers
 */
const createBody = (options, headers) => {
  if (options.body && headers.get("content-type").includes("json")) {
    return JSON.stringify(options.body)
  }
  return undefined
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
