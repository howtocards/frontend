import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import { Container } from 'ui/templates'
import { joinRoutes } from 'features/join'


const NFPad = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`

const NotFoundPage = () => (
  <Container>
    <NFPad>
      Page not found! =(
    </NFPad>
  </Container>
)

export const rootRoutes = () => (
  <Switch>
    {joinRoutes()}
    <Route component={NotFoundPage} />
  </Switch>
)
