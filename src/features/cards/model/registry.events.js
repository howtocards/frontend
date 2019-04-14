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

/**
 * Push new cards to registry and replace exists
 */
export const mergeCards: Event<Card[]> = createEvent()

export const clearRegistry: Event<void> = createEvent()

export const setUsefulMark: Effect<
  { cardId: number, isUseful: boolean, previousValue?: boolean },
  Card,
> = createEffect()
