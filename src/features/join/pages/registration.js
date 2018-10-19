import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'

import { Col, Row } from 'styled-components-layout'
import { Card, Input, H2, ButtonPrimary, Link, ErrorBox } from 'ui/atoms'
import { PrimitiveFooter } from 'ui/organisms'
import { Container, CenterContentTemplate } from 'ui/templates'

import { userRegister } from '../effects/registration'
import { userLogin } from '../effects/join'


const MINIMUM_PASSWORD_LENGTH = 6

const mapServerToClientError = (error) => {
  switch (error) {
    case 'email_already_exists': return 'That email already exists. Maybe login?'

    default: return 'Got an unexpected error. Try again later'
  }
}

const mapDispatchToProps = (dispatch) => ({
  onRegister: (registerData) => dispatch(userRegister, registerData),
  onLogin: (loginData) => dispatch(userLogin, loginData),
})

const formik = {
  mapPropsToValues: () => ({
    email: '',
    password: '',
    passwordRepeat: '',
  }),
  validate: (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Please enter email, it is required'
    }

    if (!values.password) {
      errors.password = 'Please enter password which you will use later to login'
    }

    if (values.password && values.password.length < MINIMUM_PASSWORD_LENGTH) {
      errors.password = 'Please enter a valid password that is at least 6 characters'
    }

    if (values.password !== values.passwordRepeat) {
      errors.passwordRepeat = 'Please check password fields, it should be equal'
    }

    return errors
  },
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const registerResult = await props.onRegister(values)

    if (registerResult.ok) {
      const loginResult = await props.onLogin(values)

      if (loginResult.ok) {
        props.history.push('/')
      }
      else {
        setErrors({ common: mapServerToClientError(loginResult.error) })
        setSubmitting(false)
      }
    }
    else {
      setErrors({ common: mapServerToClientError(registerResult.error) })
      setSubmitting(false)
    }
  },
}

const enhance = compose(
  connect(null, mapDispatchToProps),
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
      <H2>Registration to HowToCards</H2>
      {errors.common && <ErrorBox>{errors.common}</ErrorBox>}
      <Input
        type="email"
        name="email"
        label="Email"
        autoComplete="emails"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        error={touched.email && errors.email}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        autoComplete="password"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        error={touched.password && errors.password}
      />
      <Input
        type="password"
        name="passwordRepeat"
        label="Repeat password"
        autoComplete="password"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.passwordRepeat}
        error={touched.passwordRepeat && errors.passwordRepeat}
      />
      <ButtonPrimary
        type="submit"
        disabled={isSubmitting}
      >
        Create account
      </ButtonPrimary>
    </Col>
  </form>
))

export const RegistrationPage = ({ history }) => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="stretch" width="40rem">
        <Card>
          <RegisterForm history={history} />
        </Card>
        <Row padding="3rem 0 0" gap="0.5rem">
          <span>Already have account?</span>
          <Link to="/join">Log in</Link>
        </Row>
      </Col>
    </Container>
  </CenterContentTemplate>
)

RegistrationPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
}
