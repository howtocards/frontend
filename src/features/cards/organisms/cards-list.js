import React from "react"
import PropTypes from "prop-types"
import { useStore, createComponent } from "effector-react"
import styled from "styled-components"

import { ConditionalList } from "@howtocards/ui"
import { cardsFetching } from "../model/home"
import { $registry, getCard } from "../model/registry.store"
import { setUsefulMark } from "../model/registry.events"
import { CardSkeleton } from "./card-skeleton"

const onUsefulClick = (cardId) => {
  const card = getCard(cardId)
  if (card) {
    setUsefulMark({ cardId: card.id, isUseful: !card.meta.isUseful })
  }
}

const selectCards = (props) =>
  $registry.map((reg) => props.ids.map((id) => reg[id]))

export const CardsList = createComponent(
  selectCards,
  ({ renderCard }, cards) => {
    const isLoading = useStore(cardsFetching.isLoading)

    return (
      <>
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <ConditionalList
            list={cards}
            renderExists={(list) => (
              <CardsItemsBlock>
                {list.filter(Boolean).map((card) =>
                  renderCard({
                    card,
                    onUsefulClick: () => onUsefulClick(card.id),
                  }),
                )}
              </CardsItemsBlock>
            )}
          />
        )}
      </>
    )
  },
)

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
