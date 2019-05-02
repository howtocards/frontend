import { request } from "@features/common"

/**
 * Register.
 * Create user account.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#post-account-create-user-account
 * @param {{ email: string, password: string }} registerData
 * @return {Promise<{ result: number }>}
 */
const createAccount = (registerData) =>
  request("POST", "/account/", { body: registerData })

export const accountApi = {
  createAccount,
}

/**
 * Log in.
 * Create session token.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#post-accountsession-create-session-token
 * @param {{ email: string, password: string }} loginData
 * @return {Promise<{ result: { token: string } }>}
 */
const createSession = (loginData) =>
  request("POST", "/account/session/", { body: loginData })

/**
 * Remove single session token.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
 * @param {string} token
 * @return {Promise<{ result: boolean }>}
 */
const dropSession = (token) =>
  request("DELETE", "/account/session/", { body: { token } })

/**
 * Remove all session tokens.
 * @see https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
 * @return {Promise<{ result: boolean }>}
 */
const dropAllSessions = () => request("DELETE", "/account/session/")

export const sessionApi = {
  createSession,
  dropSession,
  dropAllSessions,
}
