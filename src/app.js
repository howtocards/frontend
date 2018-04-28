import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import { ToggleThemeProvider } from 'lib/theme-context'
import { Header } from 'ui/organisms'
import { Container, CommonContent } from 'ui/templates'
import { lightTheme } from 'ui/themes/light'
import { darkTheme } from 'ui/themes/dark'


export const App = hot(module)(() => (
  <BrowserRouter>
    <ToggleThemeProvider light={lightTheme} dark={darkTheme}>
      <React.Fragment>
        <Header>header</Header>
        <CommonContent>
          <Container>
            Hell
          </Container>
        </CommonContent>
      </React.Fragment>
    </ToggleThemeProvider>
  </BrowserRouter>
))
