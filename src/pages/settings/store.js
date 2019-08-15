// @flow
import {
  createEvent,
  createStore,
  type Store,
  createEffect,
  forward,
  sample,
  combine,
  createStoreObject,
} from "effector"
import { accountApi, type Settings } from "@api/account"

/**
 * 1. load user settings object
 * 2. mark page ready
 */

type InputEvent = SyntheticEvent<HTMLInputElement>
type ButtonEvent = SyntheticEvent<HTMLButtonElement>

export const pageMounted = createEvent<void>()
export const pageUnmounted = createEvent<void>()

export const nameChanged = createEvent<InputEvent>()
export const nameSubmitted = createEvent<ButtonEvent>()

export const avaChangePressed = createEvent<ButtonEvent>()
export const avaEmailChanged = createEvent<InputEvent>()
export const avaEmailSubmitted = createEvent<ButtonEvent>()

const loadSettings = createEffect()
const saveSettings = createEffect()

export const $settings: Store<?Settings> = createStore(null)
export const $isSettingsReady = $settings.map<boolean>(Boolean)

// Stores for inputs

export const $name: Store<string> = createStore("")
export const $avaEmail: Store<string> = createStore("")

forward({
  from: pageMounted,
  to: loadSettings,
})

loadSettings.use(accountApi.getSettings)
saveSettings.use(accountApi.updateSettings)

$settings
  .on(loadSettings.done, (_, { result }) => result.settings)
  .on(saveSettings.done, (_, { result }) => result.settings)
  .reset(pageMounted, pageUnmounted)

$name
  .on($settings.updates, (_, settings) => settings?.displayName || "")
  .on(nameChanged, (_, event) => event.currentTarget.value)
  .reset(pageUnmounted)
  .watch(nameSubmitted, (displayName) => {
    saveSettings({ displayName })
  })

$avaEmail
  .on($settings.updates, (_, settings) => settings?.gravatarEmail || "")
  .on(avaEmailChanged, (_, event) => event.currentTarget.value)
  .reset(pageUnmounted)
  .watch(avaEmailSubmitted, (_gravatarEmail) => {
    // HOW-62
    // saveSettings({ gravatarEmail })
  })

$settings.watch((settings) => console.log("SETTINGS", settings))
$isSettingsReady.watch((settingsReady) =>
  console.log("settingsReady", settingsReady),
)
$name.watch((name) => console.log("name", name))
$avaEmail.watch((avaEmail) => console.log("avaEmail", avaEmail))
