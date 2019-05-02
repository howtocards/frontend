import { createStore, createEvent } from "effector"

export const createRequestState = (effect, initial = false) =>
  createStore(initial)
    .on(effect, () => true)
    .on(effect.done, () => false)
    .on(effect.fail, () => false)

/**
 * @param {'initial'|'loading'|'done'|'fail'} initialStatus
 */
export const createFetching = (
  effect,
  initialStatus = "initial",
  { result: iresult = null, error: ierror = null, reset = createEvent() } = {},
) => {
  const result = createStore(iresult)
    .reset(effect)
    .reset(effect.fail)
    .reset(reset)
    .on(effect.done, (state, value) => value)

  const error = createStore(ierror)
    .reset(effect)
    .reset(effect.done)
    .reset(reset)
    .on(effect.fail, (state, value) => value)

  const status = createStore(initialStatus)
    .on(effect, () => "loading")
    .on(effect.done, () => "done")
    .on(effect.fail, () => "fail")
    .reset(reset)

  const isDone = status.map((state) => state === "done")
  const isFailed = status.map((state) => state === "fail")
  const isLoading = status.map((state) => state === "loading")

  return { status, result, error, isDone, isFailed, isLoading }
}
