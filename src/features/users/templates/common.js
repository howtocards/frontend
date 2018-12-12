import React from "react"
import PropTypes from "prop-types"

import { CommonContentTemplate } from "@features/common"
import { FooterContent } from "@ui/atoms"
import { Sidebar } from "@ui/molecules"
import { Container, SidebarTemplate } from "@ui/templates"

export const UsersCommonTemplate = ({ children, sidebar }) => (
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

UsersCommonTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node,
}
UsersCommonTemplate.defaultProps = {
  sidebar: null,
}
