import React from "react"
import { connect } from "react-redux"
import { compose, lifecycle } from "recompose"

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
  onFetch: (card) => dispatch(getAllCards, card),
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

export const CardsHomePage = enhance(CardsHomeView)
