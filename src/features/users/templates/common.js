import React from "react"
import PropTypes from "prop-types"

import { CommonContentTemplate } from "@features/common"
import {
  FooterContent,
  Sidebar,
  Container,
  SidebarTemplate,
} from "@howtocards/ui"

export const UsersCommonTemplate = ({ children, sidebar }) => (
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
