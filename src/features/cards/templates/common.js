// @flow
import * as React from "react"

import { CommonContentTemplate } from "@features/common"
import {
  Card,
  CenterContentTemplate,
  Container,
  FooterContent,
  Sidebar,
  SidebarTemplate,
} from "@howtocards/ui"

type Props = {
  children: React.Node,
  sidebar?: React.Node,
  error?: React.Node,
}

export const CardsCommonTemplate = ({ children, sidebar, error }: Props) => (
  <CommonContentTemplate>
    <Container>
      {error ? (
        <CenterContentTemplate>
          <Card>{error}</Card>
        </CenterContentTemplate>
      ) : (
        <SidebarTemplate
          sidebar={sidebar && <Sidebar>{sidebar}</Sidebar>}
          footer={FooterContent}
        >
          {children}
        </SidebarTemplate>
      )}
    </Container>
  </CommonContentTemplate>
)

CardsCommonTemplate.defaultProps = {
  sidebar: undefined,
  error: undefined,
}
