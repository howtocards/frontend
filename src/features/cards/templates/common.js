import React from "react"
import PropTypes from "prop-types"

import { CommonContentTemplate } from "@features/common"
import { FooterContent } from "@ui/atoms"
import { Sidebar } from "@ui/molecules"
import { Container, SidebarTemplate } from "@ui/templates"

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
