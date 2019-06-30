// @flow
import { createStore, createEvent } from "effector"
import type { Event, Store } from "effector"

export const $searchHistory: Store<string[]> = createStore([])

export const appendToSearchHistory: Event<string> = createEvent()

$searchHistory.on(appendToSearchHistory, (state, newRecord) =>
  state.concat(newRecord),
)
