/* eslint-disable import/no-duplicates */
import React from "react"
import PropTypes from "prop-types"
import { useStore } from "effector-react"
import { distanceInWordsToNow } from "date-fns"

import { Col, Row } from "lib/styled-components-layout"
import { Text } from "@howtocards/ui"
import { CardsCommonTemplate } from "../templates/common"
import { cardLoading, $card } from "../model/view"
import { CardItem, CardsList } from "../organisms"

export const CardViewPage = ({ match }) => {
  const cardId = parseInt(match.params.cardId, 10)
  React.useEffect(() => {
    cardLoading({ cardId })
  }, [cardId])

  const current = useStore($card)

  if (!current) {
    return <p>Loading...</p>
  }

  return (
    <CardsCommonTemplate sidebar={<Sidebar card={current} />}>
      <CardsList
        ids={[current.id]}
        renderCard={({ card, onUsefulClick }) => (
          <CardItem
            maximized
            key={card.id}
            card={card}
            onUsefulClick={onUsefulClick}
          />
        )}
      />
    </CardsCommonTemplate>
  )
}

CardViewPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      cardId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const Sidebar = ({ card }) => (
  <Col gap="3rem">
    <Row>
      <Text>
        Created {distanceInWordsToNow(card.createdAt, { addSuffix: true })}
      </Text>
    </Row>
  </Col>
)

Sidebar.propTypes = {
  card: PropTypes.shape({}).isRequired,
}
