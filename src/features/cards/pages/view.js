import React from "react"
import PropTypes from "prop-types"
import { useStore } from "effector-react"

import { CardsCommonTemplate } from "../templates/common"
import { cardLoading, $card } from "../model/view"
import { CardItem, CardsList } from "../organisms"

export const CardViewPage = ({ match }) => {
  const cardId = parseInt(match.params.cardId, 10)
  React.useEffect(() => {
    cardLoading({ cardId })
  }, [cardId])

  const current = useStore($card)

  return (
    <CardsCommonTemplate>
      {current ? (
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
      ) : (
        <p>Loading</p>
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
