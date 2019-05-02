import { createStore, createStoreObject, combine } from "effector"
import { emailValidator, passwordValidator } from "./validators"
import { registerFetching } from "./register.events"

export const $email = createStore("")
export const $emailError = $email.map(emailValidator)
export const $isEmailCorrect = $emailError.map((value) => value === null)

export const $password = createStore("")
export const $passwordError = $password.map(passwordValidator)
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

export const $isFormDisabled = registerFetching.isLoading
export const $isSubmitEnabled = combine(
  $isFormValid,
  registerFetching.isLoading,
  (isFormValid, isregisterFetching) => isFormValid && !isregisterFetching,
)
