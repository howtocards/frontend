import { createSelector } from "reselect"

/**
 * @root
 */
export const usersRootSelector = (root) => root.users

export const usersCurrentSelector = createSelector(
  usersRootSelector,
  (users) => users.current,
)

export const currentUserSelector = createSelector(
  usersCurrentSelector,
  (current) => current.model,
)

export const currentUserFetchingSelector = createSelector(
  usersCurrentSelector,
  (current) => current.fetching,
)
