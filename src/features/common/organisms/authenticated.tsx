import * as React from "react"
import { CurrentUser } from "@api/account"
import { WithAccount } from "./with-account"

type Props = {
  render?: (props: {
    account: CurrentUser
    accountId: number
  }) => React.ReactElement | null
}

const def = () => null

export const Authenticated = ({ render = def }: Props) => (
  <WithAccount renderExists={render} render={() => <div>Loading...</div>} />
)
