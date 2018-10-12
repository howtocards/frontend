import { createSelector } from 'reselect'


export const commonRootSelector = createSelector(
  (root) => root.common,
  (common) => common,
)

export const commonApiSelector = createSelector(
  commonRootSelector,
  (common) => common,
)

export const accountRootSelector = createSelector(
  commonRootSelector,
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

export const accountIdSelector = createSelector(
  accountSelector,
  (account) => account && account.id,
)
