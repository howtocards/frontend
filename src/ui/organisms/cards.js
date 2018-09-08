import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { WithCards } from 'features/cards'
import { Container } from 'ui/templates'
import { Card, H3, Text } from 'ui/atoms'


const CardBox = styled.div`
  margin: 1.5rem 0.5rem;
  min-width: 200px;
`

const renderCard = (item) => (
  <CardBox key={item.created}>
    <Card>
      <H3>{item.title}</H3>
      {format(new Date(item.created), 'MM/DD/YYYY')}
      <Text>{item.content}</Text>
    </Card>
  </CardBox>
)

export const Cards = () => (
  <Container>
    <WithCards
      renderExists={({ cards }) => (
        <React.Fragment>
          {cards.map(renderCard)}
        </React.Fragment>
      )}
      renderEmpty={() => (
        <div>Not found</div>
      )}
    />
  </Container>
)
