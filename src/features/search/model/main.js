// @flow
import { createEvent, createEffect, createStore } from "effector"
import type { Event, Effect, Store } from "effector"

import { createFetching, type Fetching } from "@lib/fetching"
import { cardsToObject, $cardsRegistry } from "@features/cards"
import type { Card } from "@features/common"

import { searchApi } from "../api"

export const search: Event<string> = createEvent()

const searchCardsLoading: Effect<
  string,
  { cards: Card[] },
  void,
> = createEffect()

export const homeCardsFetching: Fetching<*, void> = createFetching(
  searchCardsLoading,
  "loading",
)

export const $searchCardsIds: Store<number[]> = createStore([])

searchCardsLoading.use((query) => searchApi.search(query))

$searchCardsIds.on(searchCardsLoading.done, (_, { result }) =>
  result.cards.map((card) => card.id),
)

$cardsRegistry.on(searchCardsLoading.done, (registry, { result }) => {
  return {
    ...registry,
    ...cardsToObject(result.cards),
  }
})

search.watch((query) => {
  searchCardsLoading(query)
})
