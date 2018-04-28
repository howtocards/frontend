import React, { createContext, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'


const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
})

/* eslint-disable react/no-unused-state, react/forbid-prop-types */
export class ToggleThemeProvider extends PureComponent {
  static propTypes = {
    dark: PropTypes.object.isRequired,
    light: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  }

  state = {
    dark: false,
    toggleDark: this.toggleDark,
  }

  toggleDark = () => {
    console.log('toggle dark')
    this.setState((prevState) => ({ dark: !prevState.dark }))
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
