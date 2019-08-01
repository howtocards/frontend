// @flow
import { request } from "@features/common"

export type Card = {
  id: number,
  title: string,
  createdAt: string,
  meta: {
    canEdit: boolean,
    isUseful: boolean,
  },
  content: mixed,
}

type CreateCard = {
  title: string,
  content: {},
}
const create = (card: CreateCard): Promise<Card> =>
  request("POST", "/cards/", { body: card })

type EditCard = {
  id: number,
  title?: string,
  content?: mixed,
}
const edit = (card: EditCard): Promise<{ card: Card }> =>
  request("PUT", `/cards/${card.id}/`, { body: card })

const getLatest = (): Promise<Card[]> => request("GET", "/cards/")

const getById = (cardId: number): Promise<{ card: Card }> =>
  request("GET", `/cards/${cardId}/`)

const markUseful = (
  cardId: number,
  isUseful: boolean,
): Promise<{ card: Card }> =>
  request("POST", `/cards/${cardId}/useful/`, { body: { isUseful } })

const remove = (cardId: number): Promise<{ card: Card }> =>
  request("DELETE", `/cards/${cardId}/`)

export const cardsApi = {
  create,
  edit,
  getLatest,
  getById,
  markUseful,
  remove,
}
