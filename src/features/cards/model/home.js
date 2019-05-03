// @flow
import { createEvent, createEffect, createStore } from "effector"
import type { Event, Effect, Store } from "effector"

import { createFetching } from "@lib/fetching"
import { cardsApi } from "../api"
import type { Card } from "../types"
import { $registry } from "./registry.store"
import { cardsToObject } from "./registry.model"

export const pageReady: Event<void> = createEvent()

const homeCardsLoading: Effect<void, Card[], void> = createEffect()
export const homeCardsFetching = createFetching(homeCardsLoading, "loading")

export const $cardsIds: Store<number[]> = createStore([])

homeCardsLoading.use(() => cardsApi.getLatest())

$cardsIds.on(homeCardsLoading.done, (list, { result }) =>
  result.map((card) => card.id),
)

$registry.on(homeCardsLoading.done, (registry, { result }) => {
  return {
    ...registry,
    ...cardsToObject(result),
  }
})

pageReady.watch(() => {
  homeCardsLoading()
})
