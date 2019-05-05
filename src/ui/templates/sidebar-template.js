import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { above } from "styled-breakpoints"

export const SidebarTemplate = ({ sidebar, children, footer }) => (
  <SidebarContainer>
    <Main>{children}</Main>
    <Sidebar>{sidebar}</Sidebar>
    {footer && <ScrollableFooter>{footer}</ScrollableFooter>}
  </SidebarContainer>
)

SidebarTemplate.propTypes = {
  sidebar: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
}

SidebarTemplate.defaultProps = {
  sidebar: null,
  footer: null,
}

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
    "main"
    "footer";

  ${above("tablet")} {
    grid-template-rows: 1fr auto;
    grid-template-columns: auto 30%;
    grid-template-areas:
      "main sidebar"
      "footer footer";
  }
`

const Sidebar = styled.aside`
  grid-area: sidebar;
`

const Main = styled.div`
  grid-area: main;
`

const ScrollableFooter = styled.footer`
  grid-area: footer;
  margin-top: 4rem;
  display: block;
  height: 4rem;
`
