import React from 'react'
import styled from 'styled-components'

import { Container, CommonContentTemplate } from 'ui/templates'


const NFPad = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`

export const NotFoundPage = () => (
  <CommonContentTemplate>
    <Container>
      <NFPad>
        Page not found! =(
      </NFPad>
    </Container>
  </CommonContentTemplate>
)
