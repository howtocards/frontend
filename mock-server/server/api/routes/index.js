import Future from "fluture"

import { authenticated } from "../middlewares/auth"
import { accountApi } from "./account"
import { cardsApi } from "./cards"

export const rootApi = (root) => {
  root.get("/", api)
  root.get("/status", authenticated(), status)
  root.scope("account", accountApi)
  root.scope("cards", cardsApi)
}

const api = () =>
  Future.of({
    cards: "works",
  })

const status = () =>
  Future.of({
    status: "ok",
  })
