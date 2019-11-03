import { CurrentUser } from "@api/account"
import { request } from "./lib/request"

/**
 * Get info about current account.
 */
const getCurrentAccount = (): Promise<CurrentUser> =>
  request("GET", "/account/session/")

export const commonApi = {
  getCurrentAccount,
}
