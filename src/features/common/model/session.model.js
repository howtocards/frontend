import { forward } from "effector"
import { commonApi } from "../api"
import { tokenDropped } from "./token"
import { $session } from "./session.store"
import { sessionFetchProcessing, sessionDropped } from "./session.events"

sessionFetchProcessing.use(() => commonApi.getCurrentAccount())

$session
  .reset(sessionDropped)
  .on(sessionFetchProcessing.done, (_, { result }) => result)
  .on(sessionFetchProcessing.fail, () => null)

forward({ from: sessionFetchProcessing.fail, to: tokenDropped })
forward({ from: sessionDropped, to: tokenDropped })
