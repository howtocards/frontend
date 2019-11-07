// @flow
import {
  type Effect,
  type Store,
  combine,
  createEffect,
  createEvent,
  createStore,
} from "effector"
import { type User } from "@api/account"
import { type Card } from "@api/cards"
import { usersApi } from "@api/users"
import { type Fetching, createFetching } from "@lib/fetching"
import { $cardsRegistry, cardsToObject } from "@features/cards"
// TODO: fix type reexport

export const pageMounted = createEvent<{ username: string }>()

const loadUser: Effect<string, User, void> = createEffect()
export const userFetching: Fetching<User, void> = createFetching(
  loadUser,
  "loading",
)

type Cards = {
  useful: Card[],
  created: Card[],
}
const loadCards: Effect<string, Cards, void> = createEffect()
export const cardsFetching: Fetching<Cards, void> = createFetching(
  loadCards,
  "loading",
)

export const $user: Store<?User> = createStore(null)
export const $cards: Store<{
  useful: number[],
  created: number[],
}> = createStore({
  useful: [],
  created: [],
})

pageMounted.watch(({ username }) => {
  loadUser(username)
  loadCards(username)
})

loadUser.use((userId) => usersApi.getInfo(userId).then(({ user }) => user))

loadCards.use((userId) =>
  Promise.all([
    usersApi.getUsefulCardsFor(userId).then(({ cards }) => cards),
    usersApi.getCardsCreatedBy(userId).then(({ cards }) => cards),
  ]).then(([useful, created]) => ({ useful, created })),
)

$user.on(loadUser.done, (_, { result: user }) => user)
$cards.on(loadCards.done, (_, { result: { useful, created } }) => ({
  useful: useful.map(({ id }) => id),
  created: created.map(({ id }) => id),
}))

$cardsRegistry.on(
  loadCards.done,
  (registry, { result: { useful, created } }) => ({
    ...registry,
    ...cardsToObject(useful),
    ...cardsToObject(created),
  }),
)

export const $isLoading: Store<boolean> = combine(
  userFetching.isLoading,
  cardsFetching.isLoading,
  (userLoading, cardsLoading) => userLoading || cardsLoading,
)

export const $isFailed: Store<boolean> = combine(
  userFetching.isFailed,
  cardsFetching.isFailed,
  (userFailed, cardsFailed) => userFailed || cardsFailed,
)

export const $error: Store<?string> = combine(
  userFetching.isFailed,
  userFetching.error,
  cardsFetching.isFailed,
  cardsFetching.error,
  (userFailed, userError, cardsFailed, cardsError) => {
    if (userFailed) return userError
    if (cardsFailed) return cardsError
    return undefined
  },
)
