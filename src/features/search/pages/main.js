import React from "react"
import { useStore } from "effector-react"

import { CardsList, CardsCommonTemplate } from "@features/cards"
import { $searchCardsIds } from "../model/main"

export const SearchMainPage = () => {
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
