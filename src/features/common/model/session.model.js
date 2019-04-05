import { forward } from "effector"
import { commonApi } from "../api"
import { tokenDropped } from "./token"
import { $session } from "./session.store"
import { sessionFetchProcessing, logoutPressed } from "./session.events"

sessionFetchProcessing.use(() => commonApi.getCurrentAccount())

$session
  .reset(logoutPressed)
  .on(sessionFetchProcessing.done, (current, { result }) => result)
  .on(sessionFetchProcessing.fail, () => null)

forward({ from: sessionFetchProcessing.fail, to: tokenDropped })
forward({ from: logoutPressed, to: tokenDropped })
