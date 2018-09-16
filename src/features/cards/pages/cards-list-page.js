import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import { ConditionalList, ItemsList, CardItem } from 'ui/organisms'

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
    <ConditionalList
      list={cards}
      renderExists={(list) => (
        <ItemsList
          items={list}
          render={(item) => (
            <CardItem key={item.created} {...item} />
          )}
        />
      )}
    />
  </CardsCommonTemplate>
))
