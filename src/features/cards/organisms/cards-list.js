import React from "react"
import PropTypes from "prop-types"
import { useStore } from "effector-react"
import styled from "styled-components"

import { ConditionalList } from "@howtocards/ui"
import { $registry, getCard } from "../model/registry.store"
import { setUsefulMark } from "../model/registry.events"

const onUsefulClick = (cardId) => {
  const card = getCard(cardId)
  if (card) {
    setUsefulMark({ cardId: card.id, isUseful: !card.meta.isUseful })
  }
}

export const CardsList = ({ ids, renderCard }) => {
  const cards = useStore(
    $registry.map((registry) => ids.map((id) => registry[id])),
  )

  return (
    <ConditionalList
      list={cards}
      renderExists={(list) => (
        <CardsItemsBlock>
          {list
            .filter(Boolean)
            .map((card) =>
              renderCard({ card, onUsefulClick: () => onUsefulClick(card.id) }),
            )}
        </CardsItemsBlock>
      )}
    />
  )
}

CardsList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  renderCard: PropTypes.func.isRequired,
}

export const CardsItemsBlock = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  & > * + * {
    margin-top: 2rem;
  }
`
