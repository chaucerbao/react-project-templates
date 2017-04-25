// Dependencies
import {injectGlobal} from 'styled-components'

// Styles
export default injectGlobal`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: Verdana, Geneva, sans-serif;
  }
`
