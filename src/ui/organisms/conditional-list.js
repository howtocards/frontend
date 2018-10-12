import React, { Fragment } from 'react'
import PropTypes from 'prop-types'


export const ConditionalList = ({ list, renderExists, renderEmpty }) => (
  <Fragment>{list && list.length > 0 ? renderExists(list) : renderEmpty()}</Fragment>
)

ConditionalList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array.isRequired,
  renderExists: PropTypes.func.isRequired,
  renderEmpty: PropTypes.func,
}

ConditionalList.defaultProps = {
  renderEmpty: () => <p>Not Found</p>,
}
