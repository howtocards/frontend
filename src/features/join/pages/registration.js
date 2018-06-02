import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'

import { Col, Row } from 'styled-components-layout'
import { Card, Input, H2, Button, Link } from 'ui/atoms'
import { PrimitiveFooter } from 'ui/organisms'
import { Container, CenterContentTemplate } from 'ui/templates'

import { userRegister } from '../actions/registration'
import { userLogin } from '../actions/join'


const formik = {
  mapPropsToValues: () => ({
    email: '',
    password: '',
    passwordRepeat: '',
  }),
  validate: (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    }

    if (!values.password) {
      errors.password = 'Required'
    }

    if (values.password !== values.passwordRepeat) {
      errors.passwordRepeat = 'Not equals'
    }

    return errors
  },
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const { ok, error } = await props.dispatch(userRegister(values))

    if (ok) {
      const isLogged = await props.dispatch(userLogin(values))

      console.log({ isLogged })
    }
    else {
      console.warn({ error })
    }
    setSubmitting(false)
  },
}

const enhance = compose(
  connect(),
  withFormik(formik),
)

const RegisterForm = enhance(({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  values,
}) => (
  <form onSubmit={handleSubmit}>
    <Col gap="1rem">
      <H2>Join to HowToCards</H2>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="emails"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        failed={touched.email && Boolean(errors.email)}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="password"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        failed={touched.password && Boolean(errors.password)}
      />
      <Input
        type="password"
        name="passwordRepeat"
        placeholder="Repeat password"
        autoComplete="password"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.passwordRepeat}
        failed={touched.passwordRepeat && Boolean(errors.passwordRepeat)}
      />
      <Button.Primary
        type="submit"
        disabled={isSubmitting}
      >
        Create account
      </Button.Primary>
    </Col>
  </form>
))

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

