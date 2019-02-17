import React from "react"
import PropTypes from "prop-types"
import Plain from "slate-plain-serializer"
import { connect } from "react-redux"
import { withFormik } from "formik"
import {
  compose,
  withPropsOnChange,
  lifecycle,
  mapProps,
  withState,
} from "recompose"

import { Col } from "@lib/styled-components-layout"
import { RichEditor } from "@lib/rich-text"
import { Authenticated } from "@features/common"
import { Card, ButtonPrimary, Input } from "@ui/atoms"

import { PlaneDimensions } from "styled-icons/fa-solid/Plane"
import { CardsCommonTemplate } from "../templates/common"
import { fetchFullCard, cardEdit } from "../effects"
import { setupFormikForCreateEdit } from "../setup-formik-for-create-edit"
import { cardsRegistrySelector } from "../selectors"

const mapStateToProps = (state, props) => {
  const { cardId } = props.match.params

  return {
    cardId,
    card: cardsRegistrySelector(state)[cardId],
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFetch: (id) => dispatch(fetchFullCard, id),
  onSubmit: (card) => dispatch(cardEdit, card),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPropsOnChange(
    (props, nextProps) => props.cardId !== nextProps.cardId,
    (props) => props.onFetch(props.cardId),
  ),
  withFormik(setupFormikForCreateEdit),
)

const CardEditView = ({
  card,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  isSubmitting,
  touched,
  values,
}) => (
  <>
    {values.content && (
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
                    key={card.id}
                    disabled={isSubmitting}
                    content={values.content}
                    onChange={(content) => setFieldValue("content", content)}
                  />
                  <ButtonPrimary type="submit" disabled={isSubmitting}>
                    Edit
                  </ButtonPrimary>
                </Col>
              </form>
            </Card>
          )}
        />
      </CardsCommonTemplate>
    )}
  </>
)

CardEditView.propTypes = {
  // eslint-disable-next-line react/require-default-props
  card: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    content: PropTypes.shape({}),
  }),
}

export const CardEditPage = enhance(CardEditView)
