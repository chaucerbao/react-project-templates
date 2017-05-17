// Dependencies
import React from 'react'
import PropTypes from 'prop-types'

// Components
import Link from 'components/link'

// Component
const Button = props => (props.to ? <Link {...props} /> : <button {...props} />)

// Property validation
Button.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

// Exports
export default Button
