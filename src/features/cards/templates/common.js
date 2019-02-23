import React from "react"
import PropTypes from "prop-types"

import { CommonContentTemplate } from "@features/common"
import { FooterContent, Sidebar, Container, SidebarTemplate } from "@ui"

export const CardsCommonTemplate = ({ children, sidebar }) => (
  <CommonContentTemplate>
    <Container>
      <SidebarTemplate
        sidebar={<Sidebar>{sidebar}</Sidebar>}
        footer={FooterContent}
      >
        {children}
      </SidebarTemplate>
    </Container>
  </CommonContentTemplate>
)

CardsCommonTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node,
}

CardsCommonTemplate.defaultProps = {
  sidebar: "Sidebar placeholder",
}
