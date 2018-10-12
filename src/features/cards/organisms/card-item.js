import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import Markdown from 'react-markdown'

import { Col, Row } from 'styled-components-layout'
import { Card, H3, Text } from 'ui/atoms'


const CardBox = styled.div`
  margin: 1.5rem 0.5rem;
`

export const CardItem = ({ title, created_at: createdAt, content }) => (
  <CardBox>
    <Card>
      <Col>
        <Row justify="space-between">
          <H3 narrow>{title}</H3>
          <i narrow>{format(new Date(createdAt), 'HH:MM MM/DD/YYYY')}</i>
        </Row>
      </Col>
      <Text>
        <Markdown source={content} />
      </Text>
    </Card>
  </CardBox>
)

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  // author_id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}
