import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import styled from 'styled-components'
import { Col } from '@lib/styled-components-layout'
import { Authenticated } from '@features/common'
import { Card, Button, Input } from '@ui/atoms'
import { TextArea } from '@ui/molecules'
import { RichEditor } from '@lib/rich-text'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code as FormatCode,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
} from '@material-ui/icons'


import { CardsCommonTemplate } from '../templates/common'
import { letterCreate } from '../effects'


const CONTENT_MIN_LENGTH = 3

const mapStateToProps = null
const mapDispatchToProps = (dispatch) => ({
  onCreate: (card) => dispatch(letterCreate, card),
})

const initialForm = {
  richEditor: false,
  title: '',
  content: '',
}

const formik = {
  mapPropsToValues: () => initialForm,
  validate: (values) => {
    const errors = {}

    if (values.title.trim().length < CONTENT_MIN_LENGTH) {
      errors.title = 'Please, fill title'
    }
    else if (values.content.trim().length < CONTENT_MIN_LENGTH) {
      errors.content = 'Please, fill card content'
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
  connect(mapStateToProps, mapDispatchToProps),
  withFormik(formik),
)

export const Toolbar = styled.div`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid;
  border-color: ${(p) => p.theme.palette.decoration.borders};
`

const ToolBarButton = styled.div`
  cursor: pointer;
  ${({ theme, isActive }) => isActive && `
    svg {
      fill: ${theme.palette.primary.initial.background};
    }
  `}
`

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
            <Card style={{ margin: '2rem 0' }}>
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
                  <label htmlFor='richEditor'>
                    <input
                      id="richEditor"
                      name="richEditor"
                      type="checkbox"
                      onChange={handleChange}
                      checked={values.richEditor}
                    />
                    show editor
                  </label>

                  {values.richEditor ? (
                    <RichEditor
                      onChange={(content) => setFieldValue('content', content)}
                      renderToolbar={((renderButton) => (
                        <Toolbar>
                          {renderButton('bold', (props) => (
                            <ToolBarButton {...props}>
                              <FormatBold />
                            </ToolBarButton>
                          ))}
                          {renderButton('italic', (props) => (
                            <ToolBarButton {...props}>
                              <FormatItalic />
                            </ToolBarButton>
                          ))}
                          {renderButton('underlined', (props) => (
                            <ToolBarButton {...props}>
                              <FormatUnderlined />
                            </ToolBarButton>
                          ))}
                          {renderButton('code', (props) => (
                            <ToolBarButton {...props}>
                              <FormatCode />
                            </ToolBarButton>
                          ))}
                          {renderButton('block-quote', (props) => (
                            <ToolBarButton {...props}>
                              <FormatQuote />
                            </ToolBarButton>
                          ))}
                          {renderButton('numbered-list', (props) => (
                            <ToolBarButton {...props}>
                              <FormatListNumbered />
                            </ToolBarButton>
                          ))}
                          {renderButton('bulleted-list', (props) => (
                            <ToolBarButton {...props}>
                              <FormatListBulleted />
                            </ToolBarButton>
                          ))}
                        </Toolbar>
                      ))}
                    />
                  ) : (
                      <TextArea
                        name="content"
                        autoComplete="content"
                        placeholder="Type your solution"
                        rows={20}
                        disabled={isSubmitting}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.content}
                        failed={touched.content && Boolean(errors.content)}
                      />
                  )}
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
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  values: PropTypes.shape({}).isRequired,
}

export const CardCreatePage = enhance(CardCreateView)
