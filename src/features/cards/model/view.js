// @flow
import { createEffect, createStore, createEvent, combine } from "effector"
import type { Event, Effect, Store } from "effector"

import { createFetching, type Fetching } from "@lib/fetching"
import { cardsApi } from "../api"
import type { Card } from "../types"
import { $registry } from "./registry.store"
import { cardsToObject } from "./registry.model"

export const pageUnloaded: Event<void> = createEvent()

export const cardLoading: Effect<
  { cardId: number },
  { card: Card },
  void,
> = createEffect()
export const cardFetching: Fetching<*, void> = createFetching(
  cardLoading,
  "loading",
)

const $cardId = createStore(-1)

export const $card: Store<?Card> = combine(
  $registry,
  $cardId,
  (registry, cardId) => registry[cardId],
)

cardLoading.use(({ cardId }) => cardsApi.getById(cardId))

$cardId.on(cardLoading, (_, { cardId }) => cardId)
$cardId.on(cardLoading.done, (_, { result }) => result.card.id)
$cardId.reset(pageUnloaded)

$registry.on(cardLoading.done, (registry, { result }) => {
  return {
    ...registry,
    ...cardsToObject([result.card]),
  }
})
