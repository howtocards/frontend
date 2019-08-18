import { sessionDropped } from "@features/common"
import { history } from "@lib/routing"
import { cancelPressed, logoutPressed } from "./logout.events"

logoutPressed.watch(() => {
  sessionDropped()
  history.push("/")
})

cancelPressed.watch(() => {
  history.push("/")
})
