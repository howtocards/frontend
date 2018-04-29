import React from 'react'
import styled from 'styled-components'

import { Container } from 'ui/templates'
import { Card } from 'ui/atoms'


const JoinWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  align-items: center;
`

export const JoinPage = () => (
  <Container justify-content="center" padding="2rem 0 2rem 0">
    <JoinWrapper>
      <Card>
        Join ?
      </Card>
    </JoinWrapper>
  </Container>
)

