import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`

export const CardsList = ({ list, renderExists, renderEmpty }) => {
  if (list && list.length > 0) {
    return (
      <CardsWrapper>
        {list.map((item) => (
          <React.Fragment key={item.created}>
            {renderExists(item)}
          </React.Fragment>
        ))}
      </CardsWrapper>
    )
  }

  return renderEmpty({ text: 'Not Found' })
}

CardsList.propTypes = {
  renderExists: PropTypes.func,
  renderEmpty: PropTypes.func,
}
