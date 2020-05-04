// @flow
import { type Store, createStore, sample } from "effector"
import { type Card, cardsApi } from "@api/cards"
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
  if (card)
    setUsefulMark({ cardId: card.id, isUseful: !card.permissions.isUseful })
})

$registry.reset(clearRegistry)

// Optimistic update
$registry.on(setUsefulMark, (registry, params) => {
  const card = registry[params.cardId]
  if (!card) return registry

  // eslint-disable-next-line no-param-reassign
  params.previousValue = card.permissions.isUseful

  return {
    ...registry,
    [card.id]: setUseful(card, params.isUseful),
  }
})

$registry.on(setUsefulMark.done, (registry, { params, result }) => {
  if (result.card.permissions.isUseful === params.previousValue) {
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
  permissions: {
    ...card.permissions,
    isUseful,
  },
})
