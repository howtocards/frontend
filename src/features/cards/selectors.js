import { createSelector } from "reselect"

/**
 * @root
 */
export const cardsRootSelector = createSelector(
  (root) => root.cards,
  (cards) => cards,
)

export const cardsPageSelector = createSelector(
  cardsRootSelector,
  (cards) => cards.page,
)

export const cardsPageFetchingAllSelector = createSelector(
  cardsPageSelector,
  (page) => page.fetchingAll,
)

export const cardsPageFetchingOneSelector = createSelector(
  cardsPageSelector,
  (page) => page.fetchingOne,
)

export const cardsPageCardsIdsSelector = createSelector(
  cardsPageSelector,
  (page) => page.cardsIds,
)

export const cardsRegistrySelector = createSelector(
  cardsRootSelector,
  (cards) => cards.registry,
)
