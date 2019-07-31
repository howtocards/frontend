// @flow
import styled from "styled-components"

export const MenuSeparator = styled.div`
  padding: 0.357rem 0;

  &::after {
    content: "";
    height: 1px;
    display: block;
    background-color: var(--borders);
  }
`
