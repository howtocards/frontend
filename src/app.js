import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import { ToggleThemeProvider } from 'lib/theme-context'
import { Header } from 'ui/organisms'
import { CommonContent } from 'ui/templates'
import { lightTheme } from 'ui/themes/light'
import { darkTheme } from 'ui/themes/dark'

import { rootRoutes } from './routes'


export const App = hot(module)(() => (
  <ToggleThemeProvider light={lightTheme} dark={darkTheme}>
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <CommonContent>
          {rootRoutes()}
        </CommonContent>
      </React.Fragment>
    </BrowserRouter>
  </ToggleThemeProvider>
))
