import { createEvent, createEffect, type Event, type Effect } from "effector"
import { createFetching } from "@lib/fetching"
import { type Session } from "./session.store"

export const sessionDropped: Event<*> = createEvent()

export const loadSession: Effect<void, Session, *> = createEffect()
export const loadSessionFetching = createFetching(loadSession)
