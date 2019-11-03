// @flow
import { Effect, createEffect, createEvent } from "effector"
import { Card } from "../types"

export const clearRegistry = createEvent<void>()

export const usefulMarkClicked = createEvent<number>()

export const setUsefulMark: Effect<
  { cardId: number; isUseful: boolean; previousValue?: boolean },
  { card: Card }
> = createEffect()
