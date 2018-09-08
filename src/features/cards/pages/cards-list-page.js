import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { Cards } from 'ui/organisms'
import { getAllCards } from '../effects'
import { CardsCommonTemplate } from '../templates/common'


const mapStateToProps = null
const mapDispatchToProps = (dispatch) => ({
  onGetAllCards: (card) => dispatch(getAllCards, card),
})


const enhance = compose(connect(mapStateToProps, mapDispatchToProps), lifecycle({
  componentDidMount() {
    this.props.onGetAllCards()
  },
}))

export const CardsGetView = () => (
  <CardsCommonTemplate>
    <Cards />
  </CardsCommonTemplate>
)

export const CardsListPage = enhance(CardsGetView)
