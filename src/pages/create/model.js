// @flow
import Plain from "slate-plain-serializer"
import {
  createEffect,
  createEvent,
  createStore,
  createStoreObject,
} from "effector"

import { type Fetching, createFetching } from "@lib/fetching"
import { history } from "@lib/routing"
import { type Card, cardsApi } from "@api/cards"

export const titleChanged = createEvent<SyntheticEvent<HTMLInputElement>>()
export const contentChanged = createEvent<*>()
export const formSubmitted = createEvent<*>()
export const pageUnmounted = createEvent<void>()

const cardCreate = createEffect()
export const cardCreateFetching: Fetching<Card, *> = createFetching(cardCreate)

export const $title = createStore<string>("")
export const $content = createStore<{}>(
  Plain.deserialize("Start typing here...").toJS(),
)
const $form = createStoreObject({
  title: $title,
  content: $content,
})

const trimEvent = (event) => event.currentTarget.value

$title.on(titleChanged.map(trimEvent), (_, title) => title)
$content.on(contentChanged, (_, content) => content)
$form.reset(pageUnmounted)

formSubmitted.watch(() => {
  cardCreate($form.getState())
})

cardCreate.use(cardsApi.create)

cardCreate.done.watch(({ result: card }) => {
  history.push(`/open/${card.id}`)
})
