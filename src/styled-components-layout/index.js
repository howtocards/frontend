import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'


const WithTag = ({ as: HtmlTagName, children, ...props }) => (
  <HtmlTagName {...props}>
    {children}
  </HtmlTagName>
)

WithTag.propTypes = {
  /**
   * set html tag name
   * @example
   * <WithTag as="nav" />
   * <WithTag as="some-web-component" />
   */
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
}

WithTag.defaultProps = {
  as: 'div',
}

const is = (value) => typeof value !== 'undefined'

const mixins = (props) => css`
  flex-grow: ${is(props.grow) ? props.grow : 'initial'};
  flex-shrink: ${is(props.shrink) ? props.shrink : 'initial'};
  flex-basis: ${is(props.basis) ? props.basis : 'initial'};
  padding: ${is(props.padding) ? props.padding : 'initial'};
  align-items: ${is(props.align) ? props.align : 'initial'};
  justify-content: ${is(props.justify) ? props.justify : 'initial'};
  align-content: ${is(props.alignContent) ? props.alignContent : 'initial'};
  order: ${is(props.order) ? props.order : 'initial'};
`

export const Row = styled(WithTag)`
  display: flex;
  flex-direction: row;
  ${mixins}

  ${(p) => p.gap && css`
    & > :not(:first-child) {
      margin-left: ${p.gap};
    }
  `}
`

export const Col = styled(WithTag)`
  display: flex;
  flex-direction: column;
  ${mixins}

  ${(p) => p.gap && css`
    & > :not(:first-child) {
      margin-top: ${p.gap};
    }
  `}
`

// eslint-disable-next-line no-multi-assign
Row.propTypes = Col.propTypes = {
  /**
   * Set margin between children elements
   * @example
   * <Col gap="4px">
   *   <div>1</div>
   *   <div>2</div>
   *   <div>3</div>
   * </Col>
   */
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  grow: PropTypes.number,

  shrink: PropTypes.number,

  basis: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),

  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),

  /**
   * Set `align-items` css-property
   */
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),


  justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-around', 'space-between', 'space-evenly', 'safe center', 'unsafe center']),

  /**
   * Set `align-content` css-property
   */
  alignContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-around', 'space-between', 'stretch']),

  order: PropTypes.number,
}
