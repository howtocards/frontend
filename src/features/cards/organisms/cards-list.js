import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ConditionalList } from 'ui/organisms'


const CardsItemsList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  & > * + * {
    margin-top: 1rem;
  }
`

export const CardsList = ({ cards, renderCard }) => (
  <ConditionalList
    list={cards}
    renderExists={(list) => (
      <CardsItemsList>
        {list.map(renderCard)}
      </CardsItemsList>
    )}
  />
)

CardsList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  renderCard: PropTypes.func.isRequired,
}
