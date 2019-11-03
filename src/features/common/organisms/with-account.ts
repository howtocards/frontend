import * as React from "react"
import { useStore } from "effector-react"

import { CurrentUser } from "@api/account"
import { $session } from "../model/session.store"

type Props = {
  render?: (props: {
    account: CurrentUser | null
    accountId: number | null
  }) => React.ReactElement | null
  renderExists?: (props: {
    account: CurrentUser
    accountId: number
  }) => React.ReactElement | null
  renderEmpty?: (props: {
    account: null
    accountId: null
  }) => React.ReactElement | null
}

export const WithAccount = (props: Props): React.ReactNode => {
  const session = useStore($session)

  if (session && props.renderExists) {
    return props.renderExists({ account: session, accountId: session.id })
  }

  if (!session && props.renderEmpty) {
    return props.renderEmpty({ account: null, accountId: null })
  }

  return props.render
    ? props.render({ account: session, accountId: session ? session.id : null })
    : null
}
