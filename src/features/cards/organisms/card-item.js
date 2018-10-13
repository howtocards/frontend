import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import Markdown from 'react-markdown'
import highlight from 'highlightjs'

import { Col, Row } from 'styled-components-layout'
import { Card, H3, Text } from 'ui/atoms'


const CardBox = styled.div`
  margin: 1.5rem 0.5rem;
`

export class CardItem extends Component {
  contentRef = React.createRef()

  highlightBlocks() {
    if (this.contentRef.current) {
      const list = [...this.contentRef.current.querySelectorAll('code').values()]

      list
        .filter((node) => node.className.indexOf('language') > -1)
        .forEach((node) => highlight.highlightBlock(node))
    }
  }

  componentDidMount() {
    this.highlightBlocks()
  }

  componentDidUpdate() {
    this.highlightBlocks()
  }

  render() {
    const { title, created_at: createdAt, content } = this.props

    return (
      <CardBox>
        <Card>
          <Col>
            <Row justify="space-between">
              <H3 narrow>{title}</H3>
              <i>{format(new Date(createdAt), 'HH:MM MM/DD/YYYY')}</i>
            </Row>
          </Col>
          <Text innerRef={this.contentRef}>
            <Markdown source={content} />
          </Text>
        </Card>
      </CardBox>
    )
  }
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  // author_id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}
