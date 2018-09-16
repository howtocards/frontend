import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

import { Card, H3, Text } from 'ui/atoms'


const CardBox = styled.div`
  margin: 1.5rem 0.5rem;
  width: 290px;
  height: 270px;
`

export const CardItem = ({ title, author_id: authorId, created, content }) => (
  <CardBox>
    <Card>
      <H3>title: {title}</H3>
      <H3>author_id: {authorId}</H3>
      <Text>time: {format(new Date(created), 'HH:MM MM/DD/YYYY')}</Text>
      <Text>content: {content}</Text>
    </Card>
  </CardBox>
)
