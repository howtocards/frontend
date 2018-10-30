import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'

import { Card, Input, H2, ButtonPrimary, Link, ErrorBox } from '@ui/atoms'
import { PrimitiveFooter } from '@ui/organisms'
import { Container, CenterContentTemplate } from '@ui/templates'
import { Col, Row } from '@lib/styled-components-layout'

import { userLogin } from '../effects/join'


const mapServerToClientError = (error) => {
  switch (error) {
    case 'user_not_found': return 'Email not found or password is wrong'
    case 'cant_create_session': // pass thru
    default: return 'Got an unexpected error. Try again later'
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogin: (loginData) => dispatch(userLogin, loginData),
})

const formik = {
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validate: (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'To register you should enter your email'
    }

    if (!values.password) {
      errors.password = 'Please enter password which you will use to login later'
    }

    return errors
  },
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const loginResult = await props.onLogin(values)

    if (loginResult.ok) {
      props.history.push('/')
    }
    else {
      setErrors({ common: mapServerToClientError(loginResult.error) })
      setSubmitting(false)
    }
  },
}

const enhance = compose(
  connect(null, mapDispatchToProps),
  withFormik(formik),
)

const LoginForm = enhance(({
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
      <H2>Welcome to HowToCards</H2>
      {errors.common && <ErrorBox>{errors.common}</ErrorBox>}
      <Input
        type="email"
        name="email"
        autoComplete="email"
        label="Email"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        error={touched.email && errors.email}
      />
      <Input
        type="password"
        name="password"
        autoComplete="password"
        label="Password"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        error={touched.password && errors.password}
      />
      <ButtonPrimary disabled={isSubmitting} type="submit">Continue</ButtonPrimary>
    </Col>
  </form>
))

export const LoginPage = ({ history }) => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="stretch" width="40rem">
        <Card>
          <LoginForm history={history} />
        </Card>
        <Row padding="3rem 0 0" gap="0.5rem">
          <span>{'Don\'t have account? '}</span>
          <Link to="/join/registration">Register</Link>
        </Row>
      </Col>
    </Container>
  </CenterContentTemplate>
)

LoginPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
}
