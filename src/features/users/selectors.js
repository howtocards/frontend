import { createSelector } from "reselect"

const rootSelector = (root) => root.users

export const current = createSelector(
  rootSelector,
  (users) => users.current,
)

export const currentUser = createSelector(
  current,
  (usersCurrent) => usersCurrent.model,
)

export const userFetching = createSelector(
  current,
  (usersCurrent) => usersCurrent.fetching,
)

export const usefulCards = createSelector(
  current,
  (usersCurrent) => usersCurrent.useful,
)

export const createdCards = createSelector(
  current,
  (usersCurrent) => usersCurrent.created,
)
