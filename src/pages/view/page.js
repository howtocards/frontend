// @flow
import * as React from "react"
import { useStore } from "effector-react"
import { distanceInWordsToNow } from "date-fns"

import { Col, Row } from "@lib/styled-components-layout"
import { type Card } from "@api/cards"
import { Text } from "@howtocards/ui"

import {
  CardItem,
  CardSkeleton,
  CardsCommonTemplate,
  usefulMarkClicked,
} from "@features/cards"

import { $card, cardLoading } from "./model"

type Props = {
  match: {
    params: {
      cardId: string,
    },
  },
}

export const CardViewPage = ({ match }: Props) => {
  const cardId = parseInt(match.params.cardId, 10)

  React.useEffect(() => {
    cardLoading({ cardId })
  }, [cardId])

  const current = useStore($card)

  return (
    <CardsCommonTemplate sidebar={<Sidebar card={current} />}>
      {current ? (
        <CardItem
          key={current.id}
          maximized
          card={current}
          onUsefulClick={usefulMarkClicked}
        />
      ) : (
        <CardSkeleton />
      )}
    </CardsCommonTemplate>
  )
}

type SidebarProps = {
  card: ?Card,
}

const Sidebar = ({ card }: SidebarProps) => (
  <Col gap="3rem">
    <Row>
      {card ? (
        <Text title={createdAt(card)}>
          Created {distanceInWordsToNow(card.createdAt, { addSuffix: true })}
        </Text>
      ) : (
        <p>&nbsp;</p>
      )}
    </Row>
  </Col>
)

function createdAt(card) {
  const date = new Date(card.createdAt)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
