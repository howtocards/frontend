import React from 'react'
import PropTypes from 'prop-types'

import { Container, CommonContentTemplate } from 'ui/templates'


export const CardsCommonTemplate = ({ children }) => (
  <CommonContentTemplate>
    <Container>
      {children}
    </Container>
  </CommonContentTemplate>
)

CardsCommonTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}
