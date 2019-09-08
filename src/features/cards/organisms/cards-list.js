// @flow
import * as React from "react"
import { useStoreMap } from "effector-react"
import styled from "styled-components"

import { ConditionalList } from "@howtocards/ui"
import { $registry } from "../model/registry.store"
import { usefulMarkClicked } from "../model/registry.events"
import { CardItem } from "./card-item"

type Props = {
  ids: number[],
  renderEmpty?: () => React.Node,
}

export const CardsList = ({ ids, renderEmpty = emptyRenderer }: Props) => (
  <ConditionalList
    list={ids}
    renderEmpty={renderEmpty}
    renderExists={(cardsIds) => (
      <CardsItemsBlock>
        {cardsIds.map((cardId) => (
          <CardComponent id={cardId} key={cardId} />
        ))}
      </CardsItemsBlock>
    )}
  />
)

CardsList.defaultProps = {
  renderEmpty: undefined,
}

type CardProps = {
  id: number,
}
const CardComponent = ({ id }: CardProps) => {
  const card = useStoreMap({
    store: $registry,
    keys: [id],
    fn: (registry, [cardId]) => registry[cardId],
  })

  return <CardItem card={card} onUsefulClick={usefulMarkClicked} />
}

const emptyRenderer = () => <p>No cards in list</p>

export const CardsItemsBlock = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  & > * + * {
    margin-top: 2rem;
  }
`
