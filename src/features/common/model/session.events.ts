import { Effect, Event, createEffect, createEvent } from "effector"
import { createFetching } from "@lib/fetching"
import { CurrentUser } from "@api/account"

export const sessionDropped: Event<any> = createEvent()

export const loadSession: Effect<void, CurrentUser, any> = createEffect()
export const loadSessionFetching = createFetching(loadSession)
