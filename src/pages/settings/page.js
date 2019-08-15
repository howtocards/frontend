// @flow
import * as React from "react"
import styled from "styled-components"

import { SettingsTemplate } from "@features/settings"
import { H4 } from "@howtocards/ui"
import { pageMounted, pageUnmounted } from "./store"

export const SettingsPage = () => {
  React.useEffect(() => (pageMounted(), pageUnmounted))

  return (
    <SettingsTemplate title="Personal settings">
      <NameSection />
      <AvatarSection />
    </SettingsTemplate>
  )
}

const NameSection = () => {
  return (
    <FormSection title="Display name">
      Display name form here with some logic
    </FormSection>
  )
}

const AvatarSection = () => {
  return (
    <FormSection title="Avatar">
      Avatar changing form with some logic
    </FormSection>
  )
}

type FormSectionProps = {
  title: string,
  children: React.Node,
}

const FormSection = ({ title, children }: FormSectionProps) => (
  <>
    <H4>{title}</H4>
    <ContentBlock>{children}</ContentBlock>
  </>
)

const ContentBlock = styled.div``
