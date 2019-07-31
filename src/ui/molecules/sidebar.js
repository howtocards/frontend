// @flow
import * as React from "react"
import styled from "styled-components"

import { CardSticky, H2 } from "../atoms"

type Props = {
  children: React.Node,
}

export const Sidebar = ({ children }: Props) => (
  <CardSticky>
    <SidebarWrapper>{children}</SidebarWrapper>
  </CardSticky>
)

const SidebarWrapper = styled.div`
  ${H2} {
    margin-top: 0;
  }
`
