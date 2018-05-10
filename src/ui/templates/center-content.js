import React from 'react'
import styled from 'styled-components'


export const CenterContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;
  ${({ theme }) => theme.embed.canvas}
`

export const CenterContentTemplate = ({ children, footer = null }) => (
  <CenterContent>
    {children}
    {footer}
  </CenterContent>
)
