import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'

import { Col, Row } from 'styled-components-layout'
import { Card, Input, H2, H3, Button, Link } from 'ui/atoms'
import { PrimitiveFooter } from 'ui/organisms'
import { Container, CenterContentTemplate } from 'ui/templates'


const RegisterForm = () => (
  <form>
    <Col gap="1rem">
      <H2>Join to HowToCards</H2>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="emails"
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="password"
      />
      <Input
        type="password"
        name="password_repeat"
        placeholder="Repeat password"
        autoComplete="password"
      />
      <Button.Primary type="submit">Create account</Button.Primary>
    </Col>
  </form>
)

export const RegistrationPage = () => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="center" width="40rem">
        <Card>
          <RegisterForm />
        </Card>
        <Row padding="3rem 0 0" gap="0.5rem">
          <span>Already have account?</span>
          <Link to="/join">Join</Link>
        </Row>
      </Col>
    </Container>
  </CenterContentTemplate>
)

