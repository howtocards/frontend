import React, { useEffect } from "react"
import { useStore } from "effector-react"

import { $cardsIds, pageReady } from "../model/home"
import { CardsCommonTemplate } from "../templates/common"
import { CardsList, CardItem } from "../organisms"

export const CardsHomePage = () => {
  const ids = useStore($cardsIds)
  useEffect(() => {
    pageReady()
  }, [])

  return (
    <CardsCommonTemplate>
      <CardsList
        ids={ids}
        renderCard={({ card, onUsefulClick }) => (
          <CardItem key={card.id} card={card} onUsefulClick={onUsefulClick} />
        )}
      />
    </CardsCommonTemplate>
  )
}
