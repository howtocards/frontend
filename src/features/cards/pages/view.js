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
import { CardItem, CardSkeleton, CardsList } from "../organisms"

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
        <CardsList
          key={`card-view-${current.id}`}
          ids={[current.id]}
          renderCard={({ card, onUsefulClick }) => (
            <CardItem
              key={card.id}
              maximized
              card={card}
              onUsefulClick={onUsefulClick}
            />
          )}
        />
      ) : (
        <CardSkeleton />
      )}
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
      {card ? (
        <Text>
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
