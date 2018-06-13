import { createSelector } from 'reselect'


/**
 * @root
 */
export const cardsRootSelector = createSelector(
  (root) => root.cards,
  (cards) => cards,
)
