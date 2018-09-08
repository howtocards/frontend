import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Card, H3, Text } from 'ui/atoms'


const CardBox = styled.div`
  margin: 1.5rem 0.5rem;
  min-width: 250px;
`

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`

export const Cards = ({ component: WithCards }) => (
  <CardsWrapper>
    <WithCards
      renderExists={({ cards }) => (
        <React.Fragment>
          {cards.map((item) => (
            <CardBox key={item.created}>
              <Card>
                <H3>{item.title}</H3>
                <Text> {format(new Date(item.created), 'MM/DD/YYYY')}</Text>
                <Text>{item.content}</Text>
              </Card>
            </CardBox>
            ))}
        </React.Fragment>
        )}
      renderEmpty={() => (
        <div>Not found</div>
        )}
    />
  </CardsWrapper>

)

