// @flow
import { createEvent, createStore } from "effector"

export const $searchHistory = createStore<string[]>([])

export const searchHistoryChanged = createEvent<string>()

$searchHistory.on(searchHistoryChanged, (state, newRecord) =>
  state.concat(newRecord),
)
