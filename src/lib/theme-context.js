import React, { createContext, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'


const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
})

const getCurrentTheme = () => String(localStorage.getItem('dark-theme')) === 'true'

/* eslint-disable react/no-unused-state, react/forbid-prop-types */
export class ToggleThemeProvider extends PureComponent {
  static propTypes = {
    dark: PropTypes.object.isRequired,
    light: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  }

  toggleDark = () => {
    this.setState((prevState) => {
      localStorage.setItem('dark-theme', String(!prevState.dark))
      return { dark: !prevState.dark }
    })
  }

  state = {
    dark: getCurrentTheme(),
    toggleDark: this.toggleDark,
  }

  render() {
    const { dark, light, children } = this.props

    return (
      <ThemeContext.Provider value={this.state}>
        <ThemeProvider theme={this.state.dark ? dark : light}>
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    )
  }
}

export const ToggleThemeConsumer = ThemeContext.Consumer
