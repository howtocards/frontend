import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

export const ItemsList = ({ items, render }) => (
  <Items>{items.map((item) => render(item))}</Items>
)

ItemsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
}

const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`
