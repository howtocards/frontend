import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

import { Card, H3, Text } from 'ui/atoms'


const CardBox = styled.div`
  margin: 1.5rem 0.5rem;
  width: 290px;
  height: 270px;
`

export const CardItem = (props) => (
  <CardBox>
    <Card>
      <H3>title: {props.title}</H3>
      <H3>author_id: {props.author_id}</H3>
      <Text>time: {format(new Date(props.created), 'HH:MM MM/DD/YYYY')}</Text>
      <Text>content: {props.content}</Text>
    </Card>
  </CardBox>
)
