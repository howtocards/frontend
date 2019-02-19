import React from "react"
import { connect } from "react-redux"
import { compose, lifecycle } from "recompose"
import PropTypes from "prop-types"
import { getAllCards } from "../effects"
import { CardsCommonTemplate } from "../templates/common"
import {
  cardsPageFetchingAllSelector,
  cardsPageCardsIdsSelector,
} from "../selectors"
import { CardsList, CardItem } from "../organisms"

const mapStateToProps = (state) => ({
  fetching: cardsPageFetchingAllSelector(state),
  ids: cardsPageCardsIdsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onFetch: () => dispatch(getAllCards),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.onFetch()
    },
  }),
)

export const CardsHomeView = ({ ids }) => (
  <CardsCommonTemplate>
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

CardsHomeView.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export const CardsHomePage = enhance(CardsHomeView)
