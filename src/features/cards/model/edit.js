// @flow
import {
  createEvent,
  createEffect,
  createStore,
  createStoreObject,
} from "effector"
import type { Effect, Event, Store } from "effector"

import { createFetching } from "@lib/fetching"
import { history } from "@lib/routing"
import { cardsApi } from "../api"
import type { Card } from "../types"

export const pageUnloaded = createEvent<void>()
export const titleChanged = createEvent<SyntheticEvent<HTMLInputElement>>()
export const contentChanged = createEvent<mixed>()
export const savePressed = createEvent<void>()

export const cardLoading: Effect<void, void, void> = createEffect()
export const cardFetching = createFetching(cardLoading, "loading")

export const cardSaving: Effect<void, void, void> = createEffect()

export const $card: Store<?Card> = createStore(null)
