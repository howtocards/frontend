import { createSelector } from 'reselect'


/**
 * @root
 */
export const cardsRootSelector = createSelector(
  (root) => root.cards,
  (cards) => cards,
)
export const cardsSelector = createSelector(
  cardsRootSelector,
  (cards) => cards.cards,
)

export const cardsFetchingSelector = createSelector(
  cardsRootSelector,
  (cards) => cards.fetching,
)

export const cardRootSelector = createSelector(
  (root) => root.card,
  (card) => card,
)
export const cardSelector = createSelector(
  cardRootSelector,
  (card) => card.card,
)
export const cardFetchingSelector = createSelector(
  cardRootSelector,
  (card) => card.fetching,
)
