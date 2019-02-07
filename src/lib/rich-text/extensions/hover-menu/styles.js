import React from "react"
import styled from "styled-components"

export const Button = styled("span")`
  cursor: pointer;
`

export const Menu = styled("div")`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`

export const StyledMenu = styled(Menu)`
  padding: 8px 15px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: rgb(15, 14, 14);
  border-radius: 25px;
  transition: opacity 0.75s;
`
