import React from "react"
import PropTypes from "prop-types"
import Plain from "slate-plain-serializer"

import { connect } from "react-redux"
import { withFormik } from "formik"
import { compose, withProps } from "recompose"

import { Col } from "@lib/styled-components-layout"
import { RichEditor } from "@lib/rich-text"
import { Authenticated } from "@features/common"
import { Card, ButtonPrimary, Input } from "@ui"

import { CardsCommonTemplate } from "../templates/common"
import { cardCreate } from "../effects"
import { setupFormikForCreateEdit } from "../setup-formik-for-create-edit"

const mapStateToProps = null
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (card) => dispatch(cardCreate, card),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withProps({
    card: {
      title: "",
      content: Plain.deserialize("").toJS(),
    },
  }),
  withFormik(setupFormikForCreateEdit),
)

/* eslint-disable react/jsx-indent */
const CardCreateView = ({
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
                value={values.title}
                failed={touched.title && Boolean(errors.title)}
              />
              <RichEditor
                content={values.content}
                disabled={isSubmitting}
                onChange={(content) => setFieldValue("content", content)}
              />
              <ButtonPrimary type="submit" disabled={isSubmitting}>
                Create
              </ButtonPrimary>
            </Col>
          </form>
        </Card>
      )}
    />
  </CardsCommonTemplate>
)

CardCreateView.propTypes = {
  errors: PropTypes.shape({}).isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.shape({}).isRequired,
  values: PropTypes.shape({}).isRequired,
}

export const CardCreatePage = enhance(CardCreateView)
