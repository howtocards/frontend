// @flow
import { cardsApi } from "../api"
import { mergeCards, clearRegistry, setUsefulMark } from "./registry.events"
import { $registry } from "./registry.store"

$registry.reset(clearRegistry)

$registry.on(mergeCards, (registry, cards) => {
  const newPartial = cardsToObject(cards)
  return { ...registry, ...newPartial }
})

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
  if (result.meta.isUseful === params.previousValue) {
    return registry
  }

  return {
    ...registry,
    [result.id]: result,
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

const cardsToObject = (list) =>
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
