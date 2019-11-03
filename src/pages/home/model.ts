// @flow
import { createEffect, createStore, forward } from "effector"
import type { Effect } from "effector"
import { createGate } from "effector-react"

import { type Fetching, createFetching } from "@lib/fetching"
import { type Card, cardsApi } from "@api/cards"
import { $cardsRegistry, cardsToObject } from "@features/cards"

export const Gate = createGate<{}>()

const loadCards: Effect<void, Card[], void> = createEffect()
export const homeCardsFetching: Fetching<*, void> = createFetching(
  loadCards,
  "loading",
)

export const $cardsIds = createStore<number[]>([])

loadCards.use(() => cardsApi.getLatest())

$cardsIds.on(loadCards.done, (_, { result }) => result.map((card) => card.id))

$cardsRegistry.on(loadCards.done, (registry, { result }) => ({
  ...registry,
  ...cardsToObject(result),
}))

forward({
  from: Gate.open,
  to: loadCards,
})
