import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
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

export const CardsAllGetView = () => (
  <CardsCommonTemplate>CardsAllGetView</CardsCommonTemplate>
)

export const CardsAllGetPage = enhance(CardsAllGetView)
