// @flow
import * as React from "react"
import styled from "styled-components"

type Props = {
  children: React.Node,
  onClick?: (SyntheticEvent<HTMLDivElement>) => *,
}

export const MenuItem: React.ComponentType<Props> = styled.div`
  background-color: transparent;
  color: var(--bw75);
  cursor: default;
  font-size: 1.5rem;
  line-height: 3rem;
  padding-left: 1.3rem;
  padding-right: 5rem;
  margin: 0;
  transition: 150ms color, 150ms background-color;
  user-select: none;
  text-decoration: none;
  will-change: color, background-color;

  &:hover {
    background-color: var(--canvas);
    color: var(--primary);
  }
`
