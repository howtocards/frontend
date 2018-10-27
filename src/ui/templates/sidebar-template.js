import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { above } from 'styled-breakpoints'


const SidebarContainer = styled.div`
  display: grid;
  grid-column-gap: 2rem;
  padding: 2rem 0;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "sidebar"
    "main";

  ${above('tablet')} {
    grid-template-rows: 1fr;
    grid-template-columns: auto 30%;
    grid-template-areas: "main sidebar";
  }
`

const Sidebar = styled.aside`
  grid-area: sidebar;
`

const Main = styled.div`
  grid-area: main;
`

const ScrollableFooter = styled.footer`
  margin-top: 4rem;
  display: block;
  height: 4rem;
`

export const SidebarTemplate = ({ sidebar, children, footer }) => (
  <SidebarContainer>
    <Main>
      {children}
      {footer && <ScrollableFooter>{footer}</ScrollableFooter>}
    </Main>
    <Sidebar>{sidebar}</Sidebar>
  </SidebarContainer>
)

SidebarTemplate.propTypes = {
  sidebar: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.number,
}

SidebarTemplate.defaultProps = {
  footer: null,
}
