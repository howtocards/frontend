import React from 'react'
import PropTypes from 'prop-types'

import { CommonContentTemplate } from 'features/common'
import { Container } from 'ui/templates'


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
