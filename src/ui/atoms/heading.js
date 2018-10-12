/* eslint-disable no-magic-numbers */
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const H1 = styled.h1`
  margin: ${(p) => p.narrow ? 0 : 3}rem 0;
  user-select: none;
`
H1.propTypes = {
  narrow: PropTypes.bool,
}

export const H2 = styled.h2`
  margin: ${(p) => p.narrow ? 0 : 2}rem 0;
  user-select: none;
`
H2.propTypes = {
  narrow: PropTypes.bool,
}

export const H3 = styled.h3`
  margin: ${(p) => p.narrow ? 0 : 2}rem 0;
  user-select: none;
`
H3.propTypes = {
  narrow: PropTypes.bool,
}
