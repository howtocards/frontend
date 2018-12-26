import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose, lifecycle } from "recompose"
import { Col } from "@lib/styled-components-layout"
import { Authenticated } from "@features/common"
import { Card, ButtonPrimary, Input } from "@ui/atoms"
import { RichEditor } from "@lib/rich-text"
import { Formik } from "formik"
import { CardsCommonTemplate } from "../templates/common"
import { fetchFullCard, letterEdit } from "../effects"
import { formikSettings } from "../formik-settings"
import { cardsRegistrySelector } from "../selectors"

const mapStateToProps = (state, props) => {
  const { cardId } = props.match.params

  return {
    cardId,
    card: cardsRegistrySelector(state)[cardId],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { cardId } = ownProps.match.params

  return {
    onCardRead: (id) => dispatch(fetchFullCard, id),
    onSubmit: (card) => dispatch(letterEdit, cardId, card),
  }
}
const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const { cardId } = this.props

      this.props.onCardRead(cardId)
    },
  }),
)

const CardEditView = ({ card, onSubmit }) => (
  <>
    {card && (
      <Formik
        {...formikSettings(card)}
        onSubmit={onSubmit}
        render={({
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
                          value={values.title}
                          failed={touched.title && Boolean(errors.title)}
                        />
                        <RichEditor
                          content={values.content}
                          onChange={(content) =>
                            setFieldValue("content", content)
                          }
                        />
                        <ButtonPrimary type="submit">Edit</ButtonPrimary>
                      </Col>
                    </form>
                  </Card>
                </Col>
              )}
            />
          </CardsCommonTemplate>
        )}
      />
    )}
  </>
)

export const CardEditPage = enhance(CardEditView)
