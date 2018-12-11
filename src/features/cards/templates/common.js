import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { CommonContentTemplate } from "@features/common"
import { Container, SidebarTemplate } from "@ui/templates"
import { Card } from "@ui/atoms"

export const CardsCommonTemplate = ({ children }) => (
  <CommonContentTemplate>
    <Container>
      <SidebarTemplate
        sidebar={<Sidebar />}
        footer="&copy; 2018 HowTo.cards Team"
      >
        {children}
      </SidebarTemplate>
    </Container>
  </CommonContentTemplate>
)

CardsCommonTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

const Sidebar = () => <StickyCard>Sidebar placeholder</StickyCard>

const StickyCard = styled(Card)`
  position: sticky;
  top: 2rem;
`
