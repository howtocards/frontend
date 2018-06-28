import { createSelector } from 'reselect'


/**
 * @root
 */
export const commonRootSelector = createSelector(
  (root) => root.common,
  (common) => common,
)

export const commonApiSelector = createSelector(
  commonRootSelector,
  (common) => common,
)
