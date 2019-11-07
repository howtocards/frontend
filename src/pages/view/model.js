// @flow
import { combine, createEffect, createStore, forward } from "effector"
import type { Effect, Store } from "effector"
import { createGate } from "effector-react"

import { type Fetching, createFetching } from "@lib/fetching"
import { type Card, cardsApi } from "@api/cards"
import { $cardsRegistry, cardsToObject } from "@features/cards"

export type Errors = "id_not_found"

export const Gate = createGate<{ cardId: number }>()

export const loadCard: Effect<number, { card: Card }, Errors> = createEffect()
export const cardFetching: Fetching<*, Errors> = createFetching(
  loadCard,
  "loading",
)

const $cardId = createStore(-1)
export const $error = createStore<Errors | null>(null)

export const $card: Store<?Card> = combine(
  $cardsRegistry,
  $cardId,
  (registry, cardId) => registry[cardId],
)

forward({
  from: Gate.state.map(({ cardId }) => cardId),
  to: loadCard,
})

loadCard.use((cardId) => cardsApi.getById(cardId))

$cardId
  .on(loadCard, (_, cardId) => cardId)
  .on(loadCard.done, (_, { result }) => result.card.id)
  .reset(Gate.open, Gate.close, loadCard.fail)

$error
  .on(loadCard.fail, (_, { error }) => error)
  .reset(loadCard, Gate.open, Gate.close, loadCard.done)

$cardsRegistry.on(loadCard.done, (registry, { result }) => ({
  ...registry,
  ...cardsToObject([result.card]),
}))
