import React from "react"
import { useStore } from "effector-react"

import {
  Card,
  Input,
  H2,
  ButtonPrimary,
  Link,
  ErrorBox,
  PrimitiveFooter,
  Container,
  CenterContentTemplate,
} from "@howtocards/ui"

import { Col, Row } from "@lib/styled-components-layout"
import {
  formSubmitted,
  loginFetching,
  emailChanged,
  passwordChanged,
} from "../model/login.events"
import {
  $isFormDisabled,
  $isSubmitEnabled,
  $email,
  $emailError,
  $password,
  $passwordError,
} from "../model/login.store"

export const LoginPage = () => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="stretch" width="40rem">
        <Card>
          <LoginForm />
        </Card>
        <Row padding="3rem 0 0" gap="0.5rem">
          <span>Don&quot;t have account? </span>
          <Link to="/join/registration">Register</Link>
        </Row>
      </Col>
    </Container>
  </CenterContentTemplate>
)

const handleSubmit = (event) => {
  event.preventDefault()
  formSubmitted()
}

const LoginForm = () => {
  const formError = useStore(loginFetching.error)
  const isSubmitEnabled = useStore($isSubmitEnabled)

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="1rem">
        <H2>Welcome to HowToCards</H2>
        {formError && (
          <ErrorBox>{mapServerToClientError(formError.error)}</ErrorBox>
        )}
        <Email />
        <Password />
        <ButtonPrimary disabled={!isSubmitEnabled} type="submit">
          Continue
        </ButtonPrimary>
      </Col>
    </form>
  )
}

const Email = () => {
  const email = useStore($email)
  const isFormDisabled = useStore($isFormDisabled)
  const emailError = useStore($emailError)

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
    case "user_not_found":
      return "Email not found or password is wrong"
    case "cant_create_session": // pass thru
    default:
      return "Got an unexpected error. Try again later"
  }
}
