import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "recompose"
import { withFormik } from "formik"
import { Col } from "@lib/styled-components-layout"
import { Authenticated } from "@features/common"
import { Card, Button, Input } from "@ui/atoms"
import { RichEditor } from "@lib/rich-text"
import { CardsCommonTemplate } from "../templates/common"
import { letterCreate } from "../effects"

const CONTENT_MIN_LENGTH = 3

const mapStateToProps = null
const mapDispatchToProps = (dispatch) => ({
  onCreate: (card) => dispatch(letterCreate, card),
})

const initialForm = {
  title: "",
  content: "",
}

const formik = {
  mapPropsToValues: () => initialForm,
  validate: (values) => {
    const errors = {}

    if (values.title.trim().length < CONTENT_MIN_LENGTH) {
      errors.title = "Please, fill title"
    } else if (values.content.trim().length < CONTENT_MIN_LENGTH) {
      errors.content = "Please, fill card content"
    }
    return errors
  },
  handleSubmit: async (values, { props, setSubmitting }) => {
    await props.onCreate(values)

    setSubmitting(false)
    // ...
  },
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFormik(formik),
)

/* eslint-disable react/jsx-indent */
export const CardCreateView = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  isSubmitting,
  touched,
  values,
}) => (
  <CardsCommonTemplate>
    <Authenticated
      render={() => (
        <Col grow={1}>
          <Card style={{ marginBottom: "2rem" }}>
            <form onSubmit={handleSubmit}>
              <Col gap="1rem">
                <Input
                  name="title"
                  autoComplete="title"
                  placeholder="Card title"
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  failed={touched.content && Boolean(errors.content)}
                />
                <RichEditor
                  content={values.content}
                  onChange={(content) => setFieldValue("content", content)}
                />
                <Button.Primary type="submit">Create</Button.Primary>
              </Col>
            </form>
          </Card>
        </Col>
      )}
    />
  </CardsCommonTemplate>
)

CardCreateView.propTypes = {
  errors: PropTypes.shape({}).isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  values: PropTypes.shape({}).isRequired,
}

export const CardCreatePage = enhance(CardCreateView)
