import { request } from "./lib/request"

/**
 * Get info about current account.
 * @return {Promise<{ user: { email: string, displayName?: string, id: number } }>}
 */
const getCurrentAccount = () => request("GET", "/account/session/")

export const commonApi = {
  getCurrentAccount,
}
