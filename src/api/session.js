// @flow
import { request } from "@features/common"

type LoginData = {
  email: string,
  password: string,
}
/**
 * https://github.com/howtocards/frontend/tree/master/mock-server/server#post-accountsession-create-session-token
 */
const createSession = (loginData: LoginData): Promise<{ token: string }> =>
  request("POST", "/account/session/", { body: loginData })

/**
 * https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
 */
const dropSession = (token: string): Promise<boolean> =>
  request("DELETE", "/account/session/", { body: { token } })

/**
 * https://github.com/howtocards/frontend/tree/master/mock-server/server#delete-accountsession-drop-session
 */
const dropAllSessions = (): Promise<boolean> =>
  request("DELETE", "/account/session/")

export const sessionApi = {
  createSession,
  dropSession,
  dropAllSessions,
}
