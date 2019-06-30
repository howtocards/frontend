// @flow
import { request } from "@features/common"
import type { Card } from "@features/common"

const search = (query: string): Promise<{ cards: Card[] }> =>
  request("GET", `/search/?q=${query}`)

export const searchApi = {
  search,
}
