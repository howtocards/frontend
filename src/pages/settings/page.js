// @flow
/* eslint-disable no-sequences */
import * as React from "react"
import styled from "styled-components"
import { useStore } from "effector-react"

import { Col, Row } from "@lib/styled-components-layout"
import { SettingsTemplate } from "@features/settings"
import { Button, ButtonPrimary, H4, Input, ZeroButton } from "@howtocards/ui"
import {
  $avatarUrl,
  $displayName,
  $gravatarEmail,
  $isDisabled,
  $isDisplayNameChanged,
  $isGravatarEmailChanged,
  $isUsernameChanged,
  $username,
  $usernameError,
  type UsernameError,
  displayNameChanged,
  displayNameSubmitted,
  gravatarChangeCancelled,
  gravatarEmailChanged,
  gravatarEmailSubmitted,
  pageMounted,
  pageUnmounted,
  usernameChanged,
  usernameSubmitted,
} from "./model"

export const SettingsPage = () => {
  React.useEffect(() => (pageMounted(), pageUnmounted))

  return (
    <SettingsTemplate title="Personal settings">
      <AvatarSection />
      <DisplayNameSection />
      <UsernameSection />
    </SettingsTemplate>
  )
}

const DisplayNameSection = () => {
  const name = useStore($displayName)
  const isDisabled = useStore($isDisabled)
  const isChanged = useStore($isDisplayNameChanged)
  const submit = React.useCallback(
    (event) => {
      event.preventDefault()
      if (!isDisabled) displayNameSubmitted(event)
    },
    [isDisabled],
  )
  const buttonDisabled = isDisabled || !isChanged

  return (
    <FormSection title="Display name">
      <form onSubmit={submit}>
        <Col gap="1rem">
          <Input
            disabled={isDisabled}
            label="Enter your name and press Enter"
            value={name}
            onChange={displayNameChanged}
          />
          <Row>
            <Button disabled={buttonDisabled} type="submit">
              Save
            </Button>
          </Row>
        </Col>
      </form>
    </FormSection>
  )
}

const AvatarSection = () => {
  const avatarUrl = useStore($avatarUrl)

  return (
    <FormSection title="Avatar">
      <AvatarTemplate>
        <Avatar width={140} height={140} src={avatarUrl} />
        <ChangeAvatar />
      </AvatarTemplate>
    </FormSection>
  )
}

const ChangeAvatar = () => {
  const [opened, setOpened] = React.useState(false)
  const gravatarEmail = useStore($gravatarEmail)
  const isDisabled = useStore($isDisabled)
  const isChanged = useStore($isGravatarEmailChanged)

  const isSaveDisabled = isDisabled || !isChanged

  const cancel = React.useCallback(
    (event) => {
      setOpened(false)
      gravatarChangeCancelled(event)
    },
    [setOpened],
  )

  const save = React.useCallback((event) => {
    event.preventDefault()
    gravatarEmailSubmitted(event)
    setOpened(false)
  }, [])

  if (opened) {
    return (
      <form onSubmit={save} disabled={isSaveDisabled}>
        <Col gap="1rem">
          <Input
            disabled={isDisabled}
            label="Enter Email for Gravatar"
            value={gravatarEmail}
            onChange={gravatarEmailChanged}
          />
          <Row gap="1rem">
            <ButtonPrimary disabled={isSaveDisabled} type="submit">
              {gravatarEmail.trim().length === 0 ? "Use default" : "Save"}
            </ButtonPrimary>
            <ZeroButton onClick={cancel}>Cancel</ZeroButton>
          </Row>
        </Col>
      </form>
    )
  }

  return (
    <Col gap="1rem">
      <span>
        Gravatar email: <b>{gravatarEmail}</b>
      </span>
      <Row>
        <Button disabled={isDisabled} onClick={() => setOpened(true)}>
          Change
        </Button>
      </Row>
    </Col>
  )
}

const Avatar = styled.img`
  display: block;
  border-radius: 3px;
  border: 1px solid lightgray;
`

const AvatarTemplate = styled.div`
  display: flex;
  flex-flow: row nowrap;

  ${Avatar} {
    margin-right: 1rem;
  }

  form {
    flex-grow: 1;
  }
`

const UsernameSection = () => {
  const username = useStore($username)
  const isDisabled = useStore($isDisabled)
  const isChanged = useStore($isUsernameChanged)
  const error = useStore($usernameError)

  const onSubmit = React.useCallback((event) => {
    event.preventDefault()
    usernameSubmitted(event)
  })

  const isSaveDisabled = isDisabled || !isChanged

  return (
    <FormSection title="Username">
      <form disabled={isSaveDisabled} onSubmit={onSubmit}>
        <Col gap="1rem">
          <span>Username is an identifier for your profile page.</span>
          <Input
            label="Short identifier with letters, digits, . and _"
            value={username}
            onChange={usernameChanged}
            disabled={isDisabled}
          />
          {error ? UsernameErrors[error] : null}
          <Row>
            <Button disabled={isSaveDisabled} type="submit">
              Change
            </Button>
          </Row>
        </Col>
      </form>
    </FormSection>
  )
}

const UsernameErrors: { [key: UsernameError]: string } = {
  username_empty: "Please, enter a username",
  username_incorrect: "That username is incorrect",
  username_taken: "Please, enter another username",
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
