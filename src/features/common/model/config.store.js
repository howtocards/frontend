// @flow
import { createStore } from "effector"

export const $baseUri = createStore<string>("/api")
