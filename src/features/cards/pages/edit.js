import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withFormik } from "formik"
import { compose, lifecycle } from "recompose"
import { Col } from "@lib/styled-components-layout"
import { Authenticated } from "@features/common"
import { Card, ButtonPrimary, Input } from "@ui/atoms"
import { RichEditor } from "@lib/rich-text"
import { CardsCommonTemplate } from "../templates/common"
import { fetchFullCard, letterEdit } from "../effects"
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
  onSubmit: (card) => dispatch(letterEdit, card),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const { card, cardId } = this.props

      if (!card) {
        this.props.onFetch(cardId)
      }
    },
  }),
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
    {card && (
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
                      value={values.title}
                      failed={touched.title && Boolean(errors.title)}
                    />
                    <RichEditor
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
            </Col>
          )}
        />
      </CardsCommonTemplate>
    )}
  </>
)

CardEditView.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    content: PropTypes.string,
  }),
}

export const CardEditPage = enhance(CardEditView)
