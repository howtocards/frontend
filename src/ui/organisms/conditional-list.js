import React, { Fragment } from 'react'


export const ConditionalList = ({ list, renderExists, renderEmpty = () => <p>Not Found</p> }) => (
  <Fragment>{list && list.length > 0 ? renderExists(list) : renderEmpty()}</Fragment>
)
