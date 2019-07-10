// @flow
import { sample } from "effector"
import { cardsApi } from "../api"
import type { Card } from "../types"
import {
  clearRegistry,
  setUsefulMark,
  usefulMarkClicked,
} from "./registry.events"
import { $registry } from "./registry.store"

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
    [params.cardId]: setUseful(card, params.previousValue),
  }
})

setUsefulMark.use(({ cardId, isUseful }) =>
  cardsApi.markUseful(cardId, isUseful),
)

export const cardsToObject = (list: Card[]) =>
  list.reduce((object, card) => {
    // eslint-disable-next-line no-param-reassign
    object[card.id] = card
    return object
  }, {})

const setUseful = (card, isUseful) => ({
  ...card,
  meta: {
    ...card.meta,
    isUseful,
  },
})
