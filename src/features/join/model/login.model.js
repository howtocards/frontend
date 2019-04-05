import { tokenChanged, $isAuthenticated } from "@features/common"
import { history } from "@lib/routing"
import { sessionApi } from "../api"
import {
  emailChanged,
  formMounted,
  formSubmitted,
  formUnmounted,
  loginProcessing,
  passwordChanged,
} from "./login.events"
import { $email, $password, $form, $isSubmitEnabled } from "./login.store"

formMounted.watch(() => {
  if ($isAuthenticated.getState()) {
    console.info("TODO: redirect to home page")
  }
})

const trimEvent = (event) => event.target.value.trim()

$email.on(emailChanged.map(trimEvent), (current, email) => email)
$password.on(passwordChanged.map(trimEvent), (current, password) => password)
$form.reset(formUnmounted)

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return

  const form = $form.getState()
  loginProcessing(form)
})

loginProcessing.use((form) => sessionApi.createSession(form))
loginProcessing.done.watch(({ result }) => {
  tokenChanged(result.token)
  history.push("/")
})
