import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CommonContentTemplate } from 'features/common'
import { Container, SidebarTemplate } from 'ui/templates'
import { Card } from 'ui/atoms'


const StickyCard = styled(Card)`
  position: sticky;
  top: 2rem;
`

const Sidebar = () => (
  <StickyCard>
    Sidebar placeholder
  </StickyCard>
)

export const CardsCommonTemplate = ({ children }) => (
  <CommonContentTemplate>
    <Container>
      <SidebarTemplate sidebar={<Sidebar />}>
        {children}
      </SidebarTemplate>
    </Container>
  </CommonContentTemplate>
)

CardsCommonTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}
