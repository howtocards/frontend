// @flow
import {
  createEvent,
  createStore,
  type Store,
  createEffect,
  forward,
  combine,
} from "effector"
import { accountApi, type Settings } from "@api/account"
import { loadSession } from "@features/common"

/**
 * 1. load user settings object
 * 2. mark page ready
 */

type InputEvent = SyntheticEvent<HTMLInputElement>
type FormEvent = SyntheticEvent<HTMLFormElement>

export const pageMounted = createEvent<void>()
export const pageUnmounted = createEvent<void>()

export const nameChanged = createEvent<InputEvent>()
export const nameSubmitted = createEvent<FormEvent>()

export const avaEmailChanged = createEvent<InputEvent>()
export const avaEmailSubmitted = createEvent<FormEvent>()

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

export const $name: Store<string> = createStore("")
export const $avaEmail: Store<string> = createStore("")

export const $nameChanged: Store<boolean> = combine(
  $settings,
  $name,
  (settings, name) => settings?.displayName !== filterName(name),
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

$name
  .on($settings.updates, (_, settings) => settings?.displayName || "")
  .on(nameChanged, (_, event) => event.currentTarget.value)
  .reset(pageUnmounted)
  .watch(nameSubmitted, (displayName) => {
    saveSettings({ displayName: filterName(displayName) })
  })

$avaEmail
  .on($settings.updates, (_, settings) => settings?.gravatarEmail || "")
  .on(avaEmailChanged, (_, event) => event.currentTarget.value)
  .reset(pageUnmounted)
  .watch(avaEmailSubmitted, (_gravatarEmail) => {
    // HOW-62
    // saveSettings({ gravatarEmail })
  })

function filterName(value) {
  return value.trim().replace(/\s+/, " ")
}
