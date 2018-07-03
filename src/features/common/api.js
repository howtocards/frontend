import Cookies from 'browser-cookies'
import { getState, dispatch } from 'core/store'
import { commonApiSelector } from './selectors'


export const TOKEN_ID = 'hw-token'

export const request = (method, url, options = {}) => {
  const { baseUri, options: defaultOptions } = commonApiSelector(getState())
  const token = Cookies.get(TOKEN_ID)

  const fullOptions = {
    credentials: 'same-origin',
    method,
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      'Content-Type': options.body ? 'application/json' : (options.headers && options.headers['Content-Type']),
      Authorization: token ? `token ${token}` : undefined,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  }

  if (localStorage.getItem('api-debug')) {
    /* eslint-disable no-console */
    const group = `API >> ${method} ${url}`

    console.groupCollapsed(group)
    console.log('options:', options)
    console.log('fullOptions:', fullOptions)
    console.log('token:', token)
    console.groupEnd(group)
    /* eslint-enable no-console */
  }

  return fetch(`${baseUri}${url}`, fullOptions)
    .then((response) => response.json())
}

export const get = (url, options = {}) => request('GET', url, options)

export const post = (url, body, options = {}) => request('POST', url, { ...options, body })

export const put = (url, body, options = {}) => request('PUT', url, { ...options, body })

export const patch = (url, body, options = {}) => request('PATCH', url, { ...options, body })

export const destroy = (url, options = {}) => request('DELETE', url, options)
