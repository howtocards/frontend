// @flow
import * as React from "react"
import { createComponent } from "effector-react"
import styled from "styled-components"

import { ConditionalList } from "@howtocards/ui"
import { $registry, getCard } from "../model/registry.store"
import { setUsefulMark } from "../model/registry.events"
import { type Card } from "../types"
import { CardItem } from "./card-item"

const handleUsefulClick = (cardId) => {
  const card = getCard(cardId)
  if (card) {
    setUsefulMark({ cardId: card.id, isUseful: !card.meta.isUseful })
  }
}

const selectCards = (props) =>
  $registry.map((reg) => props.ids.map((id) => reg[id]))

type Props = {
  ids: number[],
  renderCard?: (param: { card: Card, onUsefulClick: () => * }) => React.Node,
  renderEmpty?: () => React.Node,
}

export const CardsList = createComponent<Props, Card[]>(
  selectCards,
  ({ renderCard = defaultCardRender, renderEmpty = emptyRenderer }, cards) => (
    <ConditionalList
      list={cards}
      renderExists={(list) => (
        <CardsItemsBlock>
          {list.filter(Boolean).map((card) =>
            renderCard({
              card,
              onUsefulClick: () => handleUsefulClick(card.id),
            }),
          )}
        </CardsItemsBlock>
      )}
      renderEmpty={renderEmpty}
    />
  ),
)

const emptyRenderer = () => <p>No cards in that list</p>
const defaultCardRender = ({
  card,
  onUsefulClick,
}: {
  card: Card,
  onUsefulClick: () => *,
}) => <CardItem key={card.id} card={card} onUsefulClick={onUsefulClick} />

export const CardsItemsBlock = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  & > * + * {
    margin-top: 2rem;
  }
`
