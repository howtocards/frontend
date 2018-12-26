import { createSelector } from "reselect"

export const commonRootSelector = createSelector(
  (root) => root.common,
  (common) => common,
)

export const commonApiSelector = createSelector(
  commonRootSelector,
  (common) => common,
)

export const accountSelector = createSelector(
  commonRootSelector,
  (account) => account.account,
)

export const accountFetchingSelector = createSelector(
  commonRootSelector,
  (account) => account.fetching,
)

export const accountIdSelector = createSelector(
  accountSelector,
  (account) => account && account.id,
)
