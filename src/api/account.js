// @flow
import { request } from "@features/common"

export type CurrentUser = {|
  id: number,
  displayName: string,
  email: string,
|}

export type ExternalUser = {|
  id: number,
  displayName: string,
|}

export type User = ExternalUser | CurrentUser

type RegisterData = {|
  email: string,
  password: string,
|}
/**
 * https://github.com/howtocards/frontend/tree/master/mock-server/server#post-account-create-user-account
 */
const createAccount = (registerData: RegisterData): Promise<number> =>
  request("POST", "/account/", { body: registerData })

export type Settings = {|
  displayName: string | null,
  gravatarEmail: string | null,
  currentEmail: string | null,
|}

export type UpdateSettings = {|
  displayName?: string,
  gravatarEmail?: string,
|}

const updateSettings = (
  data: UpdateSettings,
): Promise<{ settings: Settings }> =>
  request("PUT", "/account/settings/", { body: data })

const getSettings = (): Promise<{ settings: Settings }> =>
  request("GET", "/account/settings/")

export const accountApi = {
  createAccount,
  updateSettings,
  getSettings,
}
