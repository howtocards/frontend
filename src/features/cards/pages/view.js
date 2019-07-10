// @flow
/* eslint-disable import/no-duplicates */
import * as React from "react"
import PropTypes from "prop-types"
import { useStore } from "effector-react"
import { distanceInWordsToNow } from "date-fns"

import { Col, Row } from "@lib/styled-components-layout"
import { Text } from "@howtocards/ui"

import { CardsCommonTemplate } from "../templates/common"
import { cardLoading, $card } from "../model/view"
import { CardItem, CardSkeleton } from "../organisms"
import { usefulMarkClicked } from "../model/registry.events"

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

const Sidebar = ({ card }) => (
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

Sidebar.propTypes = {
  card: PropTypes.shape({}),
}

Sidebar.defaultProps = {
  card: null,
}

function createdAt(card) {
  const date = new Date(card.createdAt)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
