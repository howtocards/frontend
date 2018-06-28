import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'

import { Col, Row } from 'styled-components-layout'
import { Card, Input, H2, Button, Link } from 'ui/atoms'
import { PrimitiveFooter } from 'ui/organisms'
import { Container, CenterContentTemplate } from 'ui/templates'

import { userLogin } from '../effects/join'


const formik = {
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validate: (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    }

    if (!values.password) {
      errors.password = 'Required'
    }

    return errors
  },
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const isLogged = await props.dispatch(userLogin, values)

    if (isLogged) {
      props.history.push('/')
    }
    else {
      setSubmitting(false)
    }
  },
}

const enhance = compose(
  connect(),
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
      <Input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Email"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        failed={touched.email && Boolean(errors.email)}
      />
      <Input
        type="password"
        name="password"
        autoComplete="password"
        placeholder="Password"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        failed={touched.password && Boolean(errors.password)}
      />
      <Button.Primary type="submit">Continue</Button.Primary>
    </Col>
  </form>
))

export const JoinPage = ({ history }) => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="center" width="40rem">
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

