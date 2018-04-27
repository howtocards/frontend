import styled from 'styled-jss'


export const Container = styled('div')(
  {
    maxWidth: '100rem',
    width: '100%',
    display: 'inherit',
    flex: 'inherit',
    flexFlow: 'inherit',
    flexDirection: 'inherit',
  },
  ({ wide }) => wide && ({ maxWidth: '120rem' }),
)
