// Dependencies
import { injectGlobal } from 'styled-components'

// Styles
import theme from './theme'

// Theme settings
const { fontFamilies, fontSizes } = theme

// Global styles
export default injectGlobal`
  body {
    font: ${fontSizes.md} ${fontFamilies.body};
  }

  h1 {
    font: ${fontSizes.h1} ${fontFamilies.heading};
  }

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }
`
