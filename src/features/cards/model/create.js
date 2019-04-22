import Plain from "slate-plain-serializer"
import {
  createEvent,
  createEffect,
  createStore,
  createStoreObject,
} from "effector"
import { createFetching } from "@lib/fetching"
import { history } from "@lib/routing"
import { cardsApi } from "../api"

export const titleChanged = createEvent()
export const contentChanged = createEvent()
export const submitButtonPressed = createEvent()
export const pageUnmounted = createEvent()

const cardCreate = createEffect()
export const cardCreateFetching = createFetching(cardCreate)

export const $title = createStore("")
export const $content = createStore(Plain.deserialize("").toJS())
const $form = createStoreObject({
  title: $title,
  content: $content,
})

const trimEvent = (event) => event.target.value.trim()

$title.on(titleChanged.map(trimEvent), (state, title) => title)
$content.on(contentChanged, (state, content) => content)
$form.reset(pageUnmounted)

submitButtonPressed.watch(() => {
  cardCreate($form.getState())
})

cardCreate.use((form) => cardsApi.create(form))

cardCreate.done.watch(({ params, result }) => {
  history.push("/")
})
