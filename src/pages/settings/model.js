// @flow
import {
  type Store,
  combine,
  createEffect,
  createEvent,
  createStore,
  createStoreObject,
  forward,
  sample,
} from "effector"
import md5 from "md5"
import { type Settings, accountApi } from "@api/account"
import { loadSession } from "@features/common"

type InputEvent = SyntheticEvent<HTMLInputElement>
type ButtonEvent = SyntheticEvent<HTMLButtonElement>
type FormEvent = SyntheticEvent<HTMLFormElement>

export const pageMounted = createEvent<void>()
export const pageUnmounted = createEvent<void>()

const loadSettings = createEffect()
const saveSettings = createEffect()

export const $settings: Store<?Settings> = createStore(null)

export const $isSettingsReady = $settings.map<boolean>(Boolean)
export const $isLoading: Store<boolean> = combine(
  loadSettings.pending,
  saveSettings.pending,
  (loading, saving) => loading || saving,
)
export const $isDisabled: Store<boolean> = combine(
  $isSettingsReady,
  $isLoading,
  (ready, loading) => !ready || loading,
)

forward({
  from: pageMounted,
  to: loadSettings,
})

loadSettings.use(accountApi.getSettings)
saveSettings.use(accountApi.updateSettings)

forward({ from: saveSettings.done, to: loadSession })

$settings
  .on(loadSettings.done, (_, { result }) => result.settings)
  .on(saveSettings.done, (_, { result }) => result.settings)
  .reset(pageMounted, pageUnmounted)

export const displayNameChanged = createEvent<InputEvent>()
export const displayNameSubmitted = createEvent<FormEvent>()

const saveDisplayName = createEvent<string>()

export const $displayName: Store<string> = createStore("")

export const $isDisplayNameChanged: Store<boolean> = combine(
  $settings,
  $displayName,
  (settings, displayName) =>
    (settings?.displayName || "") !== filterName(displayName),
)

sample({
  source: $settings,
  clock: saveDisplayName,
  target: saveSettings,
  fn: (settings, displayName) => ({
    gravatarEmail: settings?.gravatarEmail || "",
    username: settings?.username || "",
    displayName,
  }),
})

$displayName
  .on($settings.updates, (_, settings) => settings?.displayName || "")
  .on(displayNameChanged, (_, event) => event.currentTarget.value)
  .reset(pageUnmounted)
  .watch(displayNameSubmitted, (displayName) => {
    saveDisplayName(filterName(displayName))
  })

const defaultAvatar =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=512"
const avatarParams = "d=retro&rating=g&s=512"

export const gravatarChangePressed = createEvent<ButtonEvent>()
export const gravatarEmailChanged = createEvent<InputEvent>()
export const gravatarEmailSubmitted = createEvent<FormEvent>()
export const gravatarChangeCancelled = createEvent<ButtonEvent>()

export const $gravatarEmail: Store<string> = createStore("")

export const $avatarUrl: Store<string> = combine(
  $settings,
  $gravatarEmail,
  (settings, enteredEmail) =>
    createUrl(
      filterName(enteredEmail) ||
        settings?.gravatarEmail ||
        settings?.currentEmail ||
        defaultAvatar,
    ),
)

export const $isGravatarEmailChanged: Store<boolean> = combine(
  $settings,
  $gravatarEmail,
  (settings, email) => (settings?.gravatarEmail || "") !== filterName(email),
)

sample({
  source: createStoreObject({
    settings: $settings,
    gravatarEmail: $gravatarEmail,
  }),
  clock: gravatarEmailSubmitted,
  target: saveSettings,
  fn: ({ settings, gravatarEmail }) => ({
    displayName: settings?.displayName || "",
    username: settings?.username || "",
    gravatarEmail,
  }),
})

$gravatarEmail
  .on(
    $settings.updates,
    (_, settings) => settings?.gravatarEmail || settings?.currentEmail || "",
  )
  .on(gravatarEmailChanged, (_, event) => event.currentTarget.value)
  .reset(pageUnmounted)

sample({
  source: $settings,
  clock: gravatarChangeCancelled,
  target: $gravatarEmail,
  fn: (settings) => settings?.gravatarEmail || settings?.currentEmail || "",
})

export const usernameChanged = createEvent<InputEvent>()
export const usernameSubmitted = createEvent<FormEvent>()

export type UsernameError =
  | "username_empty"
  | "username_incorrect"
  | "username_taken"

export const $username: Store<string> = createStore("")
export const $usernameError: Store<?UsernameError> = createStore(null)

export const $isUsernameChanged: Store<boolean> = combine(
  $settings,
  $username,
  (settings, username) => (settings?.username || "") !== filterName(username),
)

$username
  .on($settings.updates, (_, settings) => settings?.username || "")
  .on(usernameChanged, (_, event) => event.currentTarget.value)
  .reset(pageUnmounted)

$usernameError
  .reset(pageUnmounted, saveSettings.done, $settings.updates)
  .on(saveSettings.fail, (_, { error }) => {
    switch (error) {
      case "username_empty":
      case "username_incorrect":
      case "username_taken":
        return error
      default:
        return null
    }
  })

sample({
  source: createStoreObject({
    settings: $settings,
    username: $username,
  }),
  clock: usernameSubmitted,
  target: saveSettings,
  fn: ({ settings, username }) => ({
    displayName: settings?.displayName || "",
    gravatarEmail: settings?.gravatarEmail || "",
    username,
  }),
})

function createUrl(email) {
  return `https://www.gravatar.com/avatar/${md5(email)}?${avatarParams}`
}

function filterName(value) {
  return value.trim().replace(/\s+/, " ")
}
