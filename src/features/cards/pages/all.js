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

const withUserData = lifecycle({
  componentDidMount() {
    this.props.onGetAllCards()
  },
})

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withUserData)

export const CardsGetView = () => (
  <CardsCommonTemplate>
    <Cards />
  </CardsCommonTemplate>
)

export const CardsGetPage = enhance(CardsGetView)
