import * as React from "react"
import styled from "styled-components"

import { MainTemplate } from "@howtocards/ui/templates"
import { Header } from "../organisms"

type Props = {
  children: React.ReactNode
  header?: React.ReactNode
}

export const CommonContentTemplate = ({
  header = <Header />,
  children,
}: Props) => (
  <MainTemplate header={header}>
    <CommonContent>{children}</CommonContent>
  </MainTemplate>
)

export const CommonContent = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: auto;
  color: var(--canvas-text);
  background-color: var(--canvas);
`
