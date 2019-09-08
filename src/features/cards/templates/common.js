// @flow
import * as React from "react"

import { CommonContentTemplate } from "@features/common"
import {
  Container,
  FooterContent,
  Sidebar,
  SidebarTemplate,
} from "@howtocards/ui"

type Props = {
  children: React.Node,
  sidebar?: React.Node,
}

export const CardsCommonTemplate = ({ children, sidebar }: Props) => (
  <CommonContentTemplate>
    <Container>
      <SidebarTemplate
        sidebar={sidebar && <Sidebar>{sidebar}</Sidebar>}
        footer={FooterContent}
      >
        {children}
      </SidebarTemplate>
    </Container>
  </CommonContentTemplate>
)

CardsCommonTemplate.defaultProps = {
  sidebar: undefined,
}
