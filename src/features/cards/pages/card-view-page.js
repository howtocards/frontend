import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { format } from 'date-fns'
import { Card, H3, Text } from 'ui/atoms'
import { Col } from 'styled-components-layout'
import { cardRead } from '../effects'
import { CardsCommonTemplate } from '../templates/common'
import { cardFetchingSelector, cardSelector } from '../selectors'


const mapStateToProps = (state) => ({
  fetching: cardFetchingSelector(state),
  card: cardSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onCardRead: (id) => dispatch(cardRead, id),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { match: { params: { cardId } } } = this.props

      this.props.onCardRead(cardId)
    },
  }),
)

export const CardPage = enhance(({ card: { title, author_id: authorId, created, content } }) => (
  <CardsCommonTemplate>
    <Col grow={1}>
      <Card >
        <H3>title: {title}</H3>
        <H3>author_id: {authorId}</H3>
        <Text>time: {format(new Date(created), 'HH:MM MM/DD/YYYY')}</Text>
        <Text>content: {content}</Text>
      </Card>
    </Col>
  </CardsCommonTemplate>
))
