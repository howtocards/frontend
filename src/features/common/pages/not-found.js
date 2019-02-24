import React from "react"
import styled from "styled-components"

import { CommonContentTemplate } from "@features/common"
import { Container } from "@howtocards/ui"

export const NotFoundPage = () => (
  <CommonContentTemplate>
    <Container>
      <NotFoundContainer>Page not found! =(</NotFoundContainer>
    </Container>
  </CommonContentTemplate>
)

const NotFoundContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`
