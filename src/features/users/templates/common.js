// @flow
import * as React from "react"
import PropTypes from "prop-types"

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

export const UsersCommonTemplate = ({ children, sidebar }: Props) => (
  <CommonContentTemplate>
    <Container>
      <SidebarTemplate
        sidebar={sidebar ? <Sidebar>{sidebar}</Sidebar> : ""}
        footer={FooterContent}
      >
        {children}
      </SidebarTemplate>
    </Container>
  </CommonContentTemplate>
)

UsersCommonTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node,
}
UsersCommonTemplate.defaultProps = {
  sidebar: null,
}
