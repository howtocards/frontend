// @flow
import { createEvent, createEffect, type Effect } from "effector"
import type { Card } from "../types"

export const clearRegistry = createEvent<void>()

export const usefulMarkClicked = createEvent<number>()

export const setUsefulMark: Effect<
  { cardId: number, isUseful: boolean, previousValue?: boolean },
  { card: Card },
> = createEffect()
