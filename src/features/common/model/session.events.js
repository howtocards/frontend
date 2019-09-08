import { type Effect, type Event, createEffect, createEvent } from "effector"
import { createFetching } from "@lib/fetching"
import { type Session } from "./session.store"

export const sessionDropped: Event<*> = createEvent()

export const loadSession: Effect<void, Session, *> = createEffect()
export const loadSessionFetching = createFetching(loadSession)
