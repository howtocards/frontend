import { createStore, createStoreObject, combine } from "effector"
import { emailValidator } from "./validators"
import { loginFetching } from "./login.events"

export const $email = createStore("")
export const $emailError = $email.map(emailValidator)
export const $isEmailCorrect = $emailError.map((value) => value === null)

export const $password = createStore("")
export const $passwordError = $password.map((value) => {
  if (value && value.length > 1) return null
  return "Please, enter password"
})
export const $isPasswordCorrect = $passwordError.map((value) => value === null)

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
export const $isSubmitEnabled = combine(
  $isFormValid,
  loginFetching.isLoading,
  (isFormValid, isLoginFetching) => isFormValid && !isLoginFetching,
)
