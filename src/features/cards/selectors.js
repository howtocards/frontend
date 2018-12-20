import { createSelector } from "reselect"

/**
 * @root
 */
export const cardsRootSelector = createSelector(
  (root) => root.cards,
  (cards) => cards,
)
// export const cardsSelector = createSelector(
//   cardsRootSelector,
//   (cards) => cards.cards,
// )

// export const cardsFetchingSelector = createSelector(
//   cardsRootSelector,
//   (cards) => cards.fetching,
// )

// export const cardRootSelector = createSelector(
//   (root) => root.card,
//   (card) => card,
// )
// export const cardSelector = createSelector(
//   cardRootSelector,
//   (card) => card.card,
// )
// export const cardFetchingSelector = createSelector(
//   cardRootSelector,
//   (card) => card.fetching,
// )

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
