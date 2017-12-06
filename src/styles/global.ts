// Third-party dependencies
import { normalize } from 'polished'
import { injectGlobal } from 'styled-components'

// Styles
export default injectGlobal`
  ${normalize() as string};
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
`
