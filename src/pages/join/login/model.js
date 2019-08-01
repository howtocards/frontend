// @flow

import {
  createEvent,
  createEffect,
  createStore,
  createStoreObject,
  combine,
  type Store,
} from "effector"
import { createFetching, type Fetching } from "@lib/fetching"
import { emailValidator } from "@lib/validators"
import { history } from "@lib/routing"

import { tokenChanged, $isAuthenticated } from "@features/common"
import { sessionApi } from "@api/session"

export const emailChanged = createEvent<SyntheticEvent<HTMLInputElement>>()
export const passwordChanged = createEvent<SyntheticEvent<HTMLInputElement>>()
export const formSubmitted = createEvent<*>()
export const formMounted = createEvent<*>()
export const formUnmounted = createEvent<void>()

type LoginData = {
  email: string,
  password: string,
}

export const loginProcessing = createEffect<LoginData, { token: string }, *>()
export const loginFetching: Fetching<{ token: string }, *> = createFetching(
  loginProcessing,
)

export const $email = createStore<string>("")
export const $emailError = $email.map<?string>(emailValidator)
export const $isEmailCorrect = $emailError.map<boolean>(
  (value) => value === null,
)

export const $password = createStore<string>("")
export const $passwordError = $password.map<?string>((value) => {
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

formMounted.watch(() => {
  if ($isAuthenticated.getState()) {
    history.replace("/")
  }
})

const trimEvent = (event) => event.currentTarget.value.trim()

$email.on(emailChanged.map(trimEvent), (_, email) => email)
$password.on(passwordChanged.map(trimEvent), (_, password) => password)
$email.reset(formUnmounted, formMounted)
$password.reset(formUnmounted, formMounted)

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return

  const form = $form.getState()
  loginProcessing(form)
})

loginProcessing.use(sessionApi.createSession)
loginProcessing.done.watch(({ result }) => {
  tokenChanged(result.token)
  history.push("/")
})
