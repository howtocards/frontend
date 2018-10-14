import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import styled from 'styled-components'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code as FormatCode,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
} from '@material-ui/icons'

import { Col } from '@lib/styled-components-layout'
import { Authenticated } from '@features/common'
import { Card, Button } from '@ui/atoms'
import { RichEditor } from '@lib/rich-text'

import { CardsCommonTemplate } from '../templates/common'
import { letterCreate } from '../effects'


const WrapperSVG = styled.div`
  cursor: pointer;
  ${({ theme, isActive }) => isActive && `
    svg {
      fill: ${theme.palette.primary.initial.background};
    }
  `}
`

const mapStateToProps = null
const mapDispatchToProps = (dispatch) => ({
  onCreate: (card) => dispatch(letterCreate, card),
})

const initialForm = {
  content: '',
}

const formik = {
  mapPropsToValues: () => initialForm,
  handleSubmit: async (values, { props, setSubmitting }) => {
    /* const result = */ await props.onCreate(values)

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

export const CardCreateView = ({ handleSubmit }) => (
  <CardsCommonTemplate>
    <Authenticated
      render={() => (
        <Col grow={1}>
          <Card>
            <form onSubmit={handleSubmit}>
              <Col gap="1rem">
                <RichEditor renderToolbar={((renderButton) => (
                  <Toolbar>
                    {renderButton('bold', (props) => (
                      <WrapperSVG {...props}>
                        <FormatBold />
                      </WrapperSVG>
                    ))}
                    {renderButton('italic', (props) => (
                      <WrapperSVG {...props}>
                        <FormatItalic />
                      </WrapperSVG>
                    ))}
                    {renderButton('underlined', (props) => (
                      <WrapperSVG {...props}>
                        <FormatUnderlined />
                      </WrapperSVG>
                    ))}
                    {renderButton('code', (props) => (
                      <WrapperSVG {...props}>
                        <FormatCode />
                      </WrapperSVG>
                    ))}
                    {renderButton('block-quote', (props) => (
                      <WrapperSVG {...props}>
                        <FormatQuote />
                      </WrapperSVG>
                    ))}
                    {renderButton('numbered-list', (props) => (
                      <WrapperSVG {...props}>
                        <FormatListNumbered />
                      </WrapperSVG>
                    ))}
                    {renderButton('bulleted-list', (props) => (
                      <WrapperSVG {...props}>
                        <FormatListBulleted />
                      </WrapperSVG>
                    ))}
                  </Toolbar>
                ))}
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
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
}

export const CardCreatePage = enhance(CardCreateView)
