import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "recompose"
import { CardsCommonTemplate } from "@features/cards/templates/common"
import { CardsList, CardItem } from "@features/cards/organisms"

const mapStateToProps = (state) => ({
  ids: state.search.cardsIds,
})

const enhance = compose(connect(mapStateToProps))

export const SearchMainView = ({ ids }) => (
  <CardsCommonTemplate sidebar="Search sidebar">
    <CardsList
      ids={ids}
      renderCard={({ card, onUsefulClick }) =>
        React.createElement(CardItem, {
          card,
          key: card.id,
          onUsefulClick,
        })
      }
    />
  </CardsCommonTemplate>
)

SearchMainView.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export const SearchMainPage = enhance(SearchMainView)
