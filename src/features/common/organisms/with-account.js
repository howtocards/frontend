import { useStore } from "effector-react"
import { $session } from "../model/session.store"

export const WithAccount = ({ render, renderExists, renderEmpty }) => {
  const session = useStore($session)

  if (session && renderExists) {
    return renderExists({ account: session, accountId: session.id })
  }

  if (!session && renderEmpty) {
    return renderEmpty({ account: session, accountId: null })
  }

  return render
    ? render({ account: session, accountId: session ? session.id : null })
    : null
}
