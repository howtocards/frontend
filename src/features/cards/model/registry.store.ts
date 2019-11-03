// @flow
import { Store, createStore, sample } from "effector"
import { Card, cardsApi } from "@api/cards"
import {
  clearRegistry,
  setUsefulMark,
  usefulMarkClicked,
} from "./registry.events"

type Registry = { [id: number]: Card }

export const $registry: Store<Registry> = createStore({})

export function getCard(cardId: number) {
  return $registry.getState()[cardId]
}

sample(
  $registry,
  usefulMarkClicked,
  (registry, cardId) => registry[cardId],
).watch((card) => {
  if (card) setUsefulMark({ cardId: card.id, isUseful: !card.meta.isUseful })
})

$registry.reset(clearRegistry)

// Optimistic update
$registry.on(setUsefulMark, (registry, params) => {
  const card = registry[params.cardId]
  if (!card) return registry

  // eslint-disable-next-line no-param-reassign
  params.previousValue = card.meta.isUseful

  return {
    ...registry,
    [card.id]: setUseful(card, params.isUseful),
  }
})

$registry.on(setUsefulMark.done, (registry, { params, result }) => {
  if (result.card.meta.isUseful === params.previousValue) {
    return registry
  }

  return {
    ...registry,
    [result.card.id]: result.card,
  }
})

$registry.on(setUsefulMark.fail, (registry, { params }) => {
  const card = registry[params.cardId]
  if (!card) return registry

  return {
    ...registry,
    [params.cardId]: setUseful(card, Boolean(params.previousValue)),
  }
})

setUsefulMark.use(({ cardId, isUseful }) =>
  cardsApi.markUseful(cardId, isUseful),
)

export const cardsToObject = (list: Card[]) =>
  list.reduce(
    (object, card) => {
      object[card.id] = card
      return object
    },
    {} as Record<number, Card>,
  )

const setUseful = (card: Card, isUseful: boolean) => ({
  ...card,
  meta: {
    ...card.meta,
    isUseful,
  },
})
