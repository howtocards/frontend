// @flow
import { createEffect, createStore, createEvent, combine } from "effector"
import type { Effect, Store } from "effector"

import { createFetching, type Fetching } from "@lib/fetching"
import { cardsApi, type Card } from "@api/cards"
import { $cardsRegistry, cardsToObject } from "@features/cards"

export const pageUnloaded = createEvent<void>()

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
  $cardsRegistry,
  $cardId,
  (registry, cardId) => registry[cardId],
)

cardLoading.use(({ cardId }) => cardsApi.getById(cardId))

$cardId.on(cardLoading, (_, { cardId }) => cardId)
$cardId.on(cardLoading.done, (_, { result }) => result.card.id)
$cardId.reset(pageUnloaded)

$cardsRegistry.on(cardLoading.done, (registry, { result }) => {
  return {
    ...registry,
    ...cardsToObject([result.card]),
  }
})
