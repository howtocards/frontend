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
