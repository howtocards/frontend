// @flow
import { createEvent, createEffect, type Event, type Effect } from "effector"

export type Card = {
  id: number,
  title: string,
  createdAt: string,
  meta: {
    canEdit: boolean,
    isUseful: boolean,
  },
}

export const clearRegistry: Event<void> = createEvent()

export const setUsefulMark: Effect<
  { cardId: number, isUseful: boolean, previousValue?: boolean },
  { card: Card },
> = createEffect()
