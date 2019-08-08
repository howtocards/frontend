// @flow
import {
  createEvent,
  createEffect,
  createStore,
  createStoreObject,
  combine,
  type Store,
  sample,
} from "effector"
import { createFetching, type Fetching } from "@lib/fetching"
import { emailValidator, passwordValidator } from "@lib/validators"
import { history } from "@lib/routing"
import { $isAuthenticated, tokenChanged } from "@features/common"
import { sessionApi } from "@api/session"
import { accountApi } from "@api/account"

export const emailChanged = createEvent<SyntheticEvent<HTMLInputElement>>()
export const passwordChanged = createEvent<SyntheticEvent<HTMLInputElement>>()
export const formSubmitted = createEvent<*>()
export const formMounted = createEvent<*>()
export const formUnmounted = createEvent<void>()

const registerProcessing = createEffect()
export const registerFetching: Fetching<*, *> = createFetching(
  registerProcessing,
)

export const $email = createStore<string>("")
export const $emailError: Store<?string> = $email.map(emailValidator)
export const $isEmailCorrect = $emailError.map<boolean>(
  (value) => value === null,
)

export const $password = createStore<string>("")
export const $passwordError: Store<?string> = $password.map(passwordValidator)
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

export const $isFormDisabled = registerFetching.isLoading
export const $isSubmitEnabled: Store<boolean> = combine(
  $isFormValid,
  registerFetching.isLoading,
  (isFormValid, isregisterFetching) => isFormValid && !isregisterFetching,
)

sample($isAuthenticated, formMounted).watch((isAuthenticated) => {
  if (isAuthenticated) history.replace("/")
})

const trimEvent = (event) => event.currentTarget.value.trim()

$email.on(emailChanged.map(trimEvent), (_, email) => email)
$password.on(passwordChanged.map(trimEvent), (_, password) => password)
$form.reset(formUnmounted).reset(formMounted)

sample(
  createStoreObject({ isSubmitEnabled: $isSubmitEnabled, form: $form }),
  formSubmitted,
).watch(({ form, isSubmitEnabled }) => {
  if (isSubmitEnabled) registerProcessing(form)
})

registerProcessing.use((form) =>
  accountApi.createAccount(form).then(() => sessionApi.createSession(form)),
)
registerProcessing.done.watch(({ result }) => {
  tokenChanged(result.token)
  history.push("/")
})
