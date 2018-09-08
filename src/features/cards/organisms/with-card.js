import React from 'react'
import { connect } from 'react-redux'

import { cardsSelector, cardsFetchingSelector } from '../selectors'


const mapStateToProps = (state) => ({
  fetching: cardsFetchingSelector(state),
  cards: cardsSelector(state),
})

const enhance = connect(mapStateToProps)

const passProps = ({ render, renderExists, renderEmpty, fetching, cards }) => {
  if (cards && renderExists) {
    return renderExists({ fetching, cards })
  }
  else if (renderEmpty) {
    return renderEmpty({ fetching, cards })
  }

  return render ? render({ fetching, cards }) : null
}

export const WithCards = enhance(passProps)
