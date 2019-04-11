import { sessionDropped } from "@features/common"
import { history } from "@lib/routing"
import { logoutPressed, cancelPressed } from "./logout.events"

logoutPressed.watch(() => {
  sessionDropped()
  history.push("/")
})

cancelPressed.watch(() => {
  history.push("/")
})
