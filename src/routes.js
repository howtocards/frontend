import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import { Container, CommonContentTemplate } from 'ui/templates'
import { joinRoutes } from 'features/join'
import { cardsRoutes } from 'features/cards'


const NFPad = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`

const NotFoundPage = () => (
  <CommonContentTemplate>
    <Container>
      <NFPad>
        Page not found! =(
      </NFPad>
    </Container>
  </CommonContentTemplate>
)

export const rootRoutes = () => (
  <Switch>
    {cardsRoutes()}
    {joinRoutes()}
    <Route component={NotFoundPage} />
  </Switch>
)
