// @flow
import {
  createStore,
  createEvent,
  type Effect,
  type Event,
  type Store,
} from "effector"

// export const createRequestState = (effect, initial = false) =>
//   createStore(initial)
//     .on(effect, () => true)
//     .on(effect.done, () => false)
//     .on(effect.fail, () => false)

type Status = "initial" | "loading" | "done" | "fail"
type Params<R, E, Rs> = {
  result?: R,
  error?: E,
  reset?: Event<Rs>,
}

export type Fetching<R, E> = {
  result: Store<?R>,
  error: Store<?E>,
  status: Store<Status>,
  isDone: Store<boolean>,
  isFailed: Store<boolean>,
  isLoading: Store<boolean>,
}

export function createFetching<Pr, Result, Err, Reset>(
  effect: Effect<Pr, Result, Err>,
  initialStatus: Status = "initial",
  params?: Params<Result, Err, Reset> = {},
): Fetching<Result, Err> {
  const customReset = params.reset || createEvent<Reset>()

  const result: Store<?Result> = createStore(params.result || null)
    .reset(effect)
    .reset(effect.fail)
    .reset(customReset)
    .on(effect.done, (_, { result: value }) => value)

  const error: Store<?Err> = createStore(params.error || null)
    .reset(effect)
    .reset(effect.done)
    .reset(customReset)
    .on(effect.fail, (_, { error: value }) => value)

  const status: Store<Status> = createStore(initialStatus)
    .on(effect, () => "loading")
    .on(effect.done, () => "done")
    .on(effect.fail, () => "fail")
    .on(customReset, () => "initial")

  const isDone: Store<boolean> = status.map((state) => state === "done")
  const isFailed: Store<boolean> = status.map((state) => state === "fail")
  const isLoading: Store<boolean> = status.map((state) => state === "loading")

  return { result, error, status, isDone, isFailed, isLoading }
}
