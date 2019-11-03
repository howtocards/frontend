// @flow

import {
  type Store,
  combine,
  createEffect,
  createEvent,
  createStore,
  createStoreObject,
  forward,
  guard,
  sample,
} from "effector"
import { type Fetching, createFetching } from "@lib/fetching"
import { emailValidator } from "@lib/validators"
import { history } from "@lib/routing"

import { $isAuthenticated, tokenChanged } from "@features/common"
import { sessionApi } from "@api/session"

export const emailChanged = createEvent<SyntheticEvent<HTMLInputElement>>()
export const passwordChanged = createEvent<SyntheticEvent<HTMLInputElement>>()
export const formSubmitted = createEvent<*>()
export const formMounted = createEvent<*>()
export const formUnmounted = createEvent<void>()
const historyPushed = createEvent<string>()
const historyReplaced = createEvent<string>()

type LoginData = {
  email: string,
  password: string,
}

export const loginProcessing = createEffect<LoginData, { token: string }, *>()
export const loginFetching: Fetching<{ token: string }, *> = createFetching(
  loginProcessing,
)

export const $email = createStore<string>("")
export const $emailError = $email.map<string | null>(emailValidator)
export const $isEmailCorrect = $emailError.map<boolean>(
  (value) => value === null,
)

export const $password = createStore<string>("")
export const $passwordError = $password.map<null | string>((value) => {
  if (value && value.length > 1) return null
  return "Please, enter password"
})
export const $isPasswordCorrect = $passwordError.map<boolean>(
  (value) => value === null,
)

export const $form = createStoreObject({
  email: $email,
  password: $password,
})

const $isFormValid = combine(
  $isPasswordCorrect,
  $isEmailCorrect,
  (isPasswordCorrect, isEmailCorrect) => isPasswordCorrect && isEmailCorrect,
)

export const $isFormDisabled = loginFetching.isLoading
export const $isSubmitEnabled: Store<boolean> = combine(
  $isFormValid,
  loginFetching.isLoading,
  (isFormValid, isLoginFetching) => isFormValid && !isLoginFetching,
)

loginProcessing.use(sessionApi.createSession)

guard({
  source: sample($isAuthenticated, formMounted),
  filter: (isAuth) => isAuth,
  target: historyReplaced.prepend(() => "/"),
})

const trimEvent = (event) => event.currentTarget.value.trim()

$email.on(emailChanged.map(trimEvent), (_, email) => email)
$password.on(passwordChanged.map(trimEvent), (_, password) => password)
$email.reset(formUnmounted, formMounted)
$password.reset(formUnmounted, formMounted)

guard({
  source: sample(combine($isSubmitEnabled, $form), formSubmitted),
  filter: ([isEnabled]) => isEnabled,
  target: loginProcessing.prepend(([_, form]) => form),
})

forward({
  from: loginProcessing.done.map(({ result }) => result.token),
  to: tokenChanged,
})

forward({
  from: loginProcessing.done,
  to: historyPushed.prepend(() => "/"),
})

historyPushed.watch((path) => history.push(path))
historyReplaced.watch((path) => history.replace(path))
