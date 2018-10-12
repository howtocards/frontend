import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Header } from '../organisms'


export const CommonContent = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: auto;
  height: 100%;
  ${({ theme }) => theme.embed.canvas}
`

export const CommonContentTemplate = ({ children, header }) => (
  <React.Fragment>
    {header}
    <CommonContent>
      {children}
    </CommonContent>
  </React.Fragment>
)

CommonContentTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
}

CommonContentTemplate.defaultProps = {
  header: <Header />,
}
