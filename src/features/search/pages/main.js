import React from "react"
import { useStore } from "effector-react"
import { CardsList, CardItem, CardsCommonTemplate } from "@features/cards"
import { $searchCardsIds } from "../model/main"

export const SearchMainPage = () => {
  const ids = useStore($searchCardsIds)

  return (
    <CardsCommonTemplate sidebar="Search sidebar">
      <CardsList
        ids={ids}
        renderCard={({ card, onUsefulClick }) =>
          React.createElement(CardItem, {
            card,
            key: card.id,
            onUsefulClick,
          })
        }
      />
    </CardsCommonTemplate>
  )
}
