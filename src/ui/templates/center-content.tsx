import * as React from "react"
import styled from "styled-components"

type Props = {
  children: React.ReactChildren
  footer: React.ElementType | null
}

export const CenterContentTemplate = ({ children, footer = null }: Props) => (
  <CenterContent>
    {children}
    {footer}
  </CenterContent>
)

export const CenterContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;
  color: var(--canvas-text);
  background-color: var(--canvas);
`
