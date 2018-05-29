import Cookies from 'browser-cookies'


export class Api {
  constructor(serverUri, defaultOptions = {}) {
    this.baseUri = serverUri
    this.options = defaultOptions
  }

  request(method, url, options = {}) {
    if (localStorage.getItem('api-debug')) {
      /* eslint-disable no-console */
      const group = `API >> ${method} ${url}`

      console.groupCollapsed(group)
      console.log(options)
      console.groupEnd(group)
      /* eslint-enable no-console */
    }

    const token = Cookies.get('hw-token')

    const fullOptions = {
      credentials: 'same-origin',
      method,
      headers: {
        ...this.options.headers,
        'Content-Type': options.body ? 'application/json' : this.options.headers['Content-Type'],
        Authorization: token ? `token ${token}` : undefined,
        ...options,
      },
      ...this.options,
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined,
    }

    return fetch(`${this.baseUri}${url}`, fullOptions)
      .then((response) => response.json())
  }

  /**
   * @param {string} url
   * @param {object} [options]
   * @return {Promise<T>}
   */
  get(url, options) {
    return this.request('GET', url, options)
  }

  /**
   * @param {string} url
   * @return {Promise<T>}
   */
  post(url, body, options) {
    return this.request('POST', url, { body, ...options })
  }

  /**
   * @param {string} url
   * @return {Promise<T>}
   */
  put(url, body, options) {
    return this.request('PUT', url, { body, ...options })
  }

  /**
   * @param {string} url
   * @return {Promise<T>}
   */
  patch(url, body, options) {
    return this.request('PATCH', url, { body, ...options })
  }

  /**
   * @param {string} url
   * @return {Promise<T>}
   */
  delete(url, body, options) {
    return this.request('DELETE', url, { body, ...options })
  }
}
