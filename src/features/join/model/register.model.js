import { history } from "@lib/routing"
import { $isAuthenticated, tokenChanged } from "@features/common"
import { sessionApi, accountApi } from "../api"
import {
  formMounted,
  emailChanged,
  passwordChanged,
  formUnmounted,
  formSubmitted,
  registerProcessing,
} from "./register.events"
import { $email, $password, $form, $isSubmitEnabled } from "./register.store"

formMounted.watch(() => {
  if ($isAuthenticated.getState()) {
    history.replace("/")
  }
})

const trimEvent = (event) => event.target.value.trim()

$email.on(emailChanged.map(trimEvent), (_, email) => email)
$password.on(passwordChanged.map(trimEvent), (_, password) => password)
$form.reset(formUnmounted).reset(formMounted)

formSubmitted.watch(() => {
  if (!$isSubmitEnabled.getState()) return

  const form = $form.getState()
  registerProcessing(form)
})

registerProcessing.use((form) =>
  accountApi.createAccount(form).then(() => sessionApi.createSession(form)),
)
registerProcessing.done.watch(({ result }) => {
  tokenChanged(result.token)
  history.push("/")
})
