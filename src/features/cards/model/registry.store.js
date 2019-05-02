// @flow
import { createStore, type Store } from "effector"
import { type Card } from "./registry.events"

type Registry = { [id: number]: Card }

export const $registry: Store<Registry> = createStore({})

export function getCard(cardId: number) {
  return $registry.getState()[cardId]
}
