import { forward } from "effector"
import { commonApi } from "../api"
import { tokenDropped } from "./token"
import { $session } from "./session.store"
import { loadSession, sessionDropped } from "./session.events"

loadSession.use(() => commonApi.getCurrentAccount())

$session
  .reset(sessionDropped)
  .on(loadSession.done, (_, { result }) => result.user)
  .on(loadSession.fail, () => null)

forward({ from: loadSession.fail, to: tokenDropped })
forward({ from: sessionDropped, to: tokenDropped })
