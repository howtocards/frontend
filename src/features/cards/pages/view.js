import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose, lifecycle } from "recompose"
import { format } from "date-fns"
import { RichEditor } from "@lib/rich-text"
import { Col } from "@lib/styled-components-layout"
import { Card, H3, Text } from "@howtocards/ui"
import { fetchFullCard } from "../effects"
import { CardsCommonTemplate } from "../templates/common"
import {
  cardsPageFetchingOneSelector,
  cardsRegistrySelector,
} from "../selectors"

const mapStateToProps = (state, props) => {
  const { cardId } = props.match.params

  return {
    cardId,
    fetching: cardsPageFetchingOneSelector(state),
    card: cardsRegistrySelector(state)[cardId],
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFetch: (id) => dispatch(fetchFullCard, id),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const { card, cardId } = this.props

      if (!card) {
        this.props.onFetch(cardId)
      }
    },
  }),
)

export const CardView = ({ card }) => (
  <CardsCommonTemplate>
    {card ? (
      <Col grow={1}>
        <Card>
          <H3>
            title:
            {card.title}
          </H3>
          <H3>
            author_id:
            {card.authorId}
          </H3>
          <Text>
            time:
            {format(new Date(card.updatedAt), "HH:MM MM/DD/YYYY")}
          </Text>
          <RichEditor readOnly content={card.content} />
        </Card>
      </Col>
    ) : (
      <p>Loading</p>
    )}
  </CardsCommonTemplate>
)

CardView.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string,
    authorId: PropTypes.number,
    updatedAt: PropTypes.string,
    content: PropTypes.shape({}),
  }).isRequired,
}

export const CardViewPage = enhance(CardView)
