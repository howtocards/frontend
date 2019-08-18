// @flow
import * as React from "react"
// TODO: remove styles
import styled from "styled-components"

import { CommonContentTemplate } from "@features/common"
import { Card, Container, H1 } from "@howtocards/ui"

type Props = {
  children: React.Node,
  title?: string,
}

export const SettingsTemplate = ({ children, title }: Props) => (
  <CommonContentTemplate>
    <Container>
      <Main>
        <Card>
          {title && <H1>{title}</H1>}
          {children}
        </Card>
      </Main>
    </Container>
  </CommonContentTemplate>
)

SettingsTemplate.defaultProps = {
  title: undefined,
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  flex-grow: 1;
  align-items: center;

  ${Card} {
    max-width: 60rem;
    width: 100%;
  }

  ${H1} {
    margin-top: 0;
    margin-bottom: 0;
  }
`
