import * as React from "react"
import styled from "styled-components"

type Props = {
  children: React.ReactChild
  sidebar?: React.ReactNode
  footer?: React.ReactNode
}

export const SidebarTemplate = ({ sidebar, children, footer }: Props) => (
  <SidebarContainer>
    <Main>{children}</Main>
    <Sidebar>{sidebar}</Sidebar>
    {footer && <ScrollableFooter>{footer}</ScrollableFooter>}
  </SidebarContainer>
)
const Sidebar = styled.aside`
  grid-area: sidebar;
`

const Main = styled.div`
  grid-area: main;
`

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

  ${Sidebar} {
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 1000px) {
    grid-template-rows: 1fr auto;
    grid-template-columns: auto 30%;
    grid-template-areas:
      "main sidebar"
      "footer footer";

    ${Sidebar} {
      margin-bottom: 0;
    }
  }
`

const ScrollableFooter = styled.footer`
  grid-area: footer;
  margin-top: 4rem;
  display: block;
  height: 4rem;
`
