import { createSelector } from 'reselect'


/**
 * @root
 */
export const accountRootSelector = createSelector(
  (root) => root.account,
  (account) => account,
)

export const accountSelector = createSelector(
  accountRootSelector,
  (account) => account.account,
)

export const accountFetchingSelector = createSelector(
  accountRootSelector,
  (account) => account.fetching,
)
