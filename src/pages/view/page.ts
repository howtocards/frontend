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

import { $card, $error, type Errors, Gate } from "./model"

type Props = {
  match: {
    params: {
      cardId: string,
    },
  },
}

export const CardViewPage = ({ match }: Props) => {
  const cardId = parseInt(match.params.cardId, 10)
  const current = useStore($card)
  const error = useStore($error)

  return (
    <>
      <Gate cardId={cardId} />
      <CardsCommonTemplate
        error={errorToMessage(error)}
        sidebar={<Sidebar card={current} />}
      >
        <SkeletonCard card={current} />
      </CardsCommonTemplate>
    </>
  )
}

type SkeletonProps = {
  card: ?Card,
}

const SkeletonCard = ({ card }: SkeletonProps) => {
  if (!card) {
    return <CardSkeleton />
  }

  return (
    <CardItem
      card={card}
      key={card.id}
      maximized
      onUsefulClick={usefulMarkClicked}
    />
  )
}

function errorToMessage(error: ?Errors) {
  switch (error) {
    case "id_not_found":
      return "Card not found. Use search to find another"
    default:
      return undefined
  }
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
