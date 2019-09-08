// @flow
import * as React from "react"
import styled from "styled-components"
import { useStore } from "effector-react"

import { SettingsTemplate } from "@features/settings"
import { Button, H4, Input } from "@howtocards/ui"
import {
  $isDisabled,
  $name,
  $nameChanged,
  nameChanged,
  nameSubmitted,
  pageMounted,
  pageUnmounted,
} from "./store"

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
  const name = useStore($name)
  const isDisabled = useStore($isDisabled)
  const isChanged = useStore($nameChanged)
  const submit = React.useCallback(
    (event) => {
      event.preventDefault()
      if (!isDisabled) nameSubmitted(event)
    },
    [isDisabled],
  )
  const buttonDisabled = isDisabled || !isChanged

  return (
    <FormSection title="Display name">
      <form onSubmit={submit}>
        <Input
          disabled={isDisabled}
          label="Enter your name and press Enter"
          value={name}
          onChange={nameChanged}
        />
        <Button disabled={buttonDisabled} type="submit">
          Save
        </Button>
      </form>
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
