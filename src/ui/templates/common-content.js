import styled from 'styled-jss'


export const CommonContent = styled('div')(
  {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    overflowY: 'auto',
  },
  ({ theme }) => theme.embed.canvas,
)
