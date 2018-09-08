import React from 'react'
import { connect } from 'react-redux'
import { cardsSelector, cardsFetchingSelector } from '../selectors'


const mapStateToProps = (state) => ({
  fetching: cardsFetchingSelector(state),
  cards: cardsSelector(state),
})

export const WithCards = connect(mapStateToProps)(({ renderExists, renderEmpty, fetching, cards }) => {
  if (cards && cards.length > 0) {
    return renderExists({ fetching, cards })
  }

  return renderEmpty({ fetching, cards })
})
