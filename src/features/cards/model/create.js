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
export const $content = createStore(
  Plain.deserialize("Start typing here...").toJS(),
)
const $form = createStoreObject({
  title: $title,
  content: $content,
})

const trimEvent = (event) => event.target.value

$title.on(titleChanged.map(trimEvent), (_, title) => title)
$content.on(contentChanged, (_, content) => content)
$form.reset(pageUnmounted)

submitButtonPressed.watch(() => {
  cardCreate($form.getState())
})

cardCreate.use((form) => cardsApi.create(form))

cardCreate.done.watch(() => {
  history.push("/")
})
