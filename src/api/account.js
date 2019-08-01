// @flow
import { request } from "@features/common"

type RegisterData = {
  email: string,
  password: string,
}
/**
 * https://github.com/howtocards/frontend/tree/master/mock-server/server#post-account-create-user-account
 */
const createAccount = (registerData: RegisterData): Promise<number> =>
  request("POST", "/account/", { body: registerData })

export const accountApi = {
  createAccount,
}
