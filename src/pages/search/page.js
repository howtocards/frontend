// @flow
import * as React from "react"
import { useStore } from "effector-react"

import { CardsCommonTemplate, CardsList } from "@features/cards"
import { $searchCardsIds } from "@features/search"

export const SearchPage = () => {
  const ids = useStore($searchCardsIds)

  return (
    <CardsCommonTemplate sidebar="Search sidebar">
      <CardsList
        ids={ids}
        renderEmpty={() => <p>No cards by this search query</p>}
      />
    </CardsCommonTemplate>
  )
}
