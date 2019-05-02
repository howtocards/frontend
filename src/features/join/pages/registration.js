import React from "react"
import { useStore } from "effector-react"

import { Col, Row } from "@lib/styled-components-layout"
import {
  Card,
  Input,
  H2,
  ButtonPrimary,
  Link,
  ErrorBox,
} from "@howtocards/ui/atoms"
import { PrimitiveFooter } from "@howtocards/ui/organisms"
import { Container, CenterContentTemplate } from "@howtocards/ui/templates"
import {
  $form,
  $isSubmitEnabled,
  $email,
  $isFormDisabled,
  $emailError,
  $password,
  $passwordError,
} from "../model/register.store"
import {
  registerFetching,
  formSubmitted,
  emailChanged,
  passwordChanged,
} from "../model/register.events"

export const RegistrationPage = () => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="stretch" width="40rem">
        <Card>
          <RegisterForm />
        </Card>
        <Row padding="3rem 0 0" gap="0.5rem">
          <span>Already have account?</span>
          <Link to="/join">Log in</Link>
        </Row>
      </Col>
    </Container>
  </CenterContentTemplate>
)

const handleSubmit = (event) => {
  event.preventDefault()
  formSubmitted()
}

const RegisterForm = () => {
  const form = useStore($form)
  const formError = useStore(registerFetching.error)
  const isSubmitEnabled = useStore($isSubmitEnabled)

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="1rem">
        <H2>Registration to HowToCards</H2>
        {formError && (
          <ErrorBox>{mapServerToClientError(formError.error)}</ErrorBox>
        )}
      </Col>
      <Email />
      <Password />
      <ButtonPrimary type="submit" disabled={!isSubmitEnabled}>
        Create account
      </ButtonPrimary>
    </form>
  )
}

const Email = () => {
  const email = useStore($email)
  const emailError = useStore($emailError)
  const isFormDisabled = useStore($isFormDisabled)

  return (
    <Input
      type="email"
      name="email"
      autoComplete="email"
      label="Email"
      disabled={isFormDisabled}
      onChange={emailChanged}
      value={email}
      error={email && emailError}
    />
  )
}

const Password = () => {
  const password = useStore($password)
  const isFormDisabled = useStore($isFormDisabled)
  const passwordError = useStore($passwordError)

  return (
    <Input
      type="password"
      name="password"
      autoComplete="password"
      label="Password"
      disabled={isFormDisabled}
      onChange={passwordChanged}
      value={password}
      error={password && passwordError}
    />
  )
}

const mapServerToClientError = (error) => {
  switch (error) {
    case "email_already_exists":
      return (
        <span>
          That email already exists. Maybe <Link to="/join">login</Link>?
        </span>
      )

    default:
      return "Got an unexpected error. Try again later"
  }
}
