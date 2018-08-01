// Dependencies
import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'

// Page
import Homepage from './pages/homepage'

// Theme
import './styles/global'
import theme from './styles/theme'

// Mount application
render(
  <ThemeProvider theme={theme}>
    <Homepage />
  </ThemeProvider>,
  document.getElementById('application')
)
