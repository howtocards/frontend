// @flow
import { createEvent, createEffect, createStore } from "effector"
import type { Effect, Store } from "effector"

import { createFetching, type Fetching } from "@lib/fetching"
import { history } from "@lib/routing"
import { cardsApi, type Card } from "@api/cards"

export const pageUnloaded = createEvent<void>()
export const titleChanged = createEvent<SyntheticEvent<HTMLInputElement>>()
export const contentChanged = createEvent<mixed>()
export const savePressed = createEvent<void>()

export const cardLoading: Effect<number, { card: Card }, void> = createEffect()
export const cardFetching: Fetching<*, void> = createFetching(
  cardLoading,
  "loading",
  {
    reset: pageUnloaded,
  },
)

type SaveCard = { id: number, title: string, content: mixed }
export const cardSaving: Effect<SaveCard, { card: Card }, void> = createEffect()
export const cardSaveFetching: Fetching<*, void> = createFetching(
  cardSaving,
  "initial",
  {
    reset: pageUnloaded,
  },
)

export const $card: Store<?Card> = createStore(null)
export const $cardId: Store<?number> = $card.map((card) => card && card.id)
export const $title: Store<?string> = $card.map((card) => card && card.title)
export const $content: Store<?mixed> = $card.map((card) => card && card.content)

cardLoading.use((cardId) => cardsApi.getById(cardId))
$card.on(cardLoading.done, (_, { result }) => result.card)
$card.on(titleChanged, (card, event) => ({
  ...card,
  title: event.currentTarget.value,
}))
$card.on(contentChanged, (card, content) => ({ ...card, content }))

cardSaving.use(({ id, title, content }) =>
  cardsApi.edit({ id, title, content }),
)
cardSaving.done.watch(({ params }) => {
  history.push(`/open/${params.id}`)
})

savePressed.watch(() => {
  const card = $card.getState()
  if (card) {
    const { id, title, content } = card
    cardSaving({ id, title, content })
  }
})

$card.reset(pageUnloaded)
