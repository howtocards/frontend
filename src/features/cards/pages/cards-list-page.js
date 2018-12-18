import React from "react"
import { connect } from "react-redux"
import { compose, lifecycle } from "recompose"

import { getAllCards, markUsefulAndUpdate } from "../effects"
import { CardsCommonTemplate } from "../templates/common"
import { cardsSelector, cardsFetchingSelector } from "../selectors"
import { CardsList, CardItem } from "../organisms"

const mapStateToProps = (state) => ({
  fetching: cardsFetchingSelector(state),
  cards: cardsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onGetAllCards: (card) => dispatch(getAllCards, card),
  onUsefulClick: (cardId, useful) =>
    dispatch(markUsefulAndUpdate, cardId, useful),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.onGetAllCards()
    },
  }),
)

export const CardsListPage = enhance(({ cards, onUsefulClick }) => (
  <CardsCommonTemplate>
    <CardsList
      cards={cards || []}
      renderCard={(card) => (
        <CardItem
          {...card}
          onClickUseful={() => onUsefulClick(card.id, !card.isUseful)}
          key={card.id}
        />
      )}
    />
  </CardsCommonTemplate>
))
