import React from "react"
import styled from "styled-components"

import { Link } from "../atoms"

export const PrimitiveFooter = () => (
  <FooterBlock>
    Go to&nbsp;
    <Link to="/">home</Link>
    &nbsp;page
  </FooterBlock>
)

const FooterBlock = styled.footer`
  display: flex;
  flex-flow: row;
  border-top: 1px solid var(--borders);
  padding: 2rem 0;
  width: 100%;
  justify-content: center;
`
