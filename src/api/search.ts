import { request } from "@features/common"
import { Card } from "@api/cards"

const search = (query: string): Promise<{ cards: Card[] }> =>
  request("GET", `/search/?q=${query}`)

export const searchApi = {
  search,
}
