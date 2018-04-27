import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-jss'

import { Header } from 'ui/organisms'
import { Container, CommonContent } from 'ui/templates'
import { lightTheme } from 'ui/themes/light'


export const App = hot(module)(() => (
  <BrowserRouter>
    <ThemeProvider theme={lightTheme}>
      <React.Fragment>
        <Header>header</Header>
        <CommonContent>
          <Container>
            Hell
          </Container>
        </CommonContent>
      </React.Fragment>
    </ThemeProvider>
  </BrowserRouter>
))
