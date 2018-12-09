import React from "react"
import { connect } from "react-redux"
import { compose, lifecycle } from "recompose"
import { format } from "date-fns"
import Markdown from "react-markdown"

import { Col } from "@lib/styled-components-layout"
import { Card, H3, Text } from "@ui/atoms"
import { cardRead } from "../effects"
import { CardsCommonTemplate } from "../templates/common"
import { cardFetchingSelector, cardSelector } from "../selectors"

const mapStateToProps = (state) => ({
  fetching: cardFetchingSelector(state),
  card: cardSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onCardRead: (id) => dispatch(cardRead, id),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const {
        match: {
          params: { cardId },
        },
      } = this.props

      this.props.onCardRead(cardId)
    },
  }),
)

export const CardPage = enhance(({ card }) => (
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
            {format(new Date(card.meta.created), "HH:MM MM/DD/YYYY")}
          </Text>
          <Markdown source={card.content} />
        </Card>
      </Col>
    ) : (
      <p>Loading</p>
    )}
  </CardsCommonTemplate>
))
