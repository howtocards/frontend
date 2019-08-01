// @flow
import { createEvent, createEffect, createStore } from "effector"
import type { Event, Effect, Store } from "effector"

import { createFetching, type Fetching } from "@lib/fetching"
import { cardsApi, type Card } from "@api/cards"
import { $cardsRegistry, cardsToObject } from "@features/cards"

export const pageReady: Event<void> = createEvent()

const homeCardsLoading: Effect<void, Card[], void> = createEffect()
export const homeCardsFetching: Fetching<*, void> = createFetching(
  homeCardsLoading,
  "loading",
)

export const $cardsIds: Store<number[]> = createStore([])

homeCardsLoading.use(() => cardsApi.getLatest())

$cardsIds.on(homeCardsLoading.done, (_, { result }) =>
  result.map((card) => card.id),
)

$cardsRegistry.on(homeCardsLoading.done, (registry, { result }) => {
  return {
    ...registry,
    ...cardsToObject(result),
  }
})

pageReady.watch(() => {
  homeCardsLoading()
})
