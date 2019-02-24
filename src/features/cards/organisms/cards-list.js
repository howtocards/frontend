import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import styled from "styled-components"
import { compose } from "recompose"

import { ConditionalList } from "@howtocards/ui"
import { cardsRegistrySelector } from "../selectors"
import { setUsefulMark } from "../effects"

const mapStateToProps = (state, props) => {
  const registry = cardsRegistrySelector(state)

  return { cards: props.ids.map((id) => registry[id]) }
}

const mapDispatchToProps = (dispatch) => ({
  onUsefulClick: (cardId) => dispatch(setUsefulMark, cardId),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)

export const CardsListView = ({ cards, renderCard, onUsefulClick }) => (
  <ConditionalList
    list={cards}
    renderExists={(list) => (
      <CardsItemsBlock>
        {list.map((card) =>
          renderCard({ card, onUsefulClick: () => onUsefulClick(card.id) }),
        )}
      </CardsItemsBlock>
    )}
  />
)

CardsListView.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renderCard: PropTypes.func.isRequired,
  onUsefulClick: PropTypes.func.isRequired,
}

export const CardsList = enhance(CardsListView)

CardsList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export const CardsItemsBlock = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  & > * + * {
    margin-top: 2rem;
  }
`
