// @flow
import {
  type Store,
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector"
import md5 from "md5"
import { type Settings, accountApi } from "@api/account"
import { loadSession } from "@features/common"

/**
 * 1. load user settings object
 * 2. mark page ready
 */

type InputEvent = SyntheticEvent<HTMLInputElement>
type ButtonEvent = SyntheticEvent<HTMLButtonElement>
type FormEvent = SyntheticEvent<HTMLFormElement>

export const pageMounted = createEvent<void>()
export const pageUnmounted = createEvent<void>()

export const nameChanged = createEvent<InputEvent>()
export const nameSubmitted = createEvent<FormEvent>()

export const avaChangePressed = createEvent<ButtonEvent>()
export const gravatarEmailChanged = createEvent<InputEvent>()
export const gravatarEmailSubmitted = createEvent<FormEvent>()
export const gravatarChangeCancelled = createEvent<ButtonEvent>()

const saveGravatar = createEvent<string>()
const saveName = createEvent<string>()

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

// Stores for inputs

const defaultAvatar =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=512"
const avatarParams = "d=retro&rating=g&s=512"

export const $name: Store<string> = createStore("")
export const $avaEmail: Store<string> = createStore("")

export const $avatarUrl: Store<string> = combine(
  $settings,
  $avaEmail,
  (settings, enteredEmail) =>
    createUrl(
      filterName(enteredEmail) ||
        settings?.gravatarEmail ||
        settings?.currentEmail ||
        defaultAvatar,
    ),
)

export const $nameChanged: Store<boolean> = combine(
  $settings,
  $name,
  (settings, name) => (settings?.displayName || "") !== filterName(name),
)

export const $avaEmailChanged: Store<boolean> = combine(
  $settings,
  $avaEmail,
  // just remove spaces from email
  (settings, email) => (settings?.gravatarEmail || "") !== filterName(email),
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

sample({
  source: $settings,
  clock: saveGravatar,
  target: saveSettings,
  fn: (settings, gravatarEmail) => ({
    displayName: settings?.displayName || "",
    username: settings?.username || "",
    gravatarEmail,
  }),
})

sample({
  source: $settings,
  clock: saveName,
  target: saveSettings,
  fn: (settings, displayName) => ({
    gravatarEmail: settings?.gravatarEmail || "",
    username: settings?.username || "",
    displayName,
  }),
})

$name
  .on($settings.updates, (_, settings) => settings?.displayName || "")
  .on(nameChanged, (_, event) => event.currentTarget.value)
  .reset(pageUnmounted)
  .watch(nameSubmitted, (displayName) => {
    saveName(filterName(displayName))
  })

$avaEmail
  .on(
    $settings.updates,
    (_, settings) => settings?.gravatarEmail || settings?.currentEmail || "",
  )
  .on(gravatarEmailChanged, (_, event) => event.currentTarget.value)
  .reset(pageUnmounted)
  .watch(gravatarEmailSubmitted, (gravatarEmail) => {
    saveGravatar(gravatarEmail)
  })

sample({
  source: $settings,
  clock: gravatarChangeCancelled,
  target: $avaEmail,
  fn: (settings) => settings?.gravatarEmail || settings?.currentEmail || "",
})

function createUrl(email) {
  return `https://www.gravatar.com/avatar/${md5(email)}?${avatarParams}`
}

function filterName(value) {
  return value.trim().replace(/\s+/, " ")
}
