import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import { CardsList, CardItem } from 'ui/organisms'

import { getAllCards } from '../effects'
import { CardsCommonTemplate } from '../templates/common'
import { cardsSelector, cardsFetchingSelector } from '../selectors'


const mapStateToProps = (state) => ({
  fetching: cardsFetchingSelector(state),
  cards: cardsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onGetAllCards: (card) => dispatch(getAllCards, card),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.onGetAllCards()
    },
  }),
)

export const CardsListPage = enhance(({ cards }) => (
  <CardsCommonTemplate>
    <CardsList
      list={cards}
      renderExists={(card) => <CardItem {...card} />}
      renderEmpty={(error) => <div>{error.text}</div>}
    />
  </CardsCommonTemplate>
))
