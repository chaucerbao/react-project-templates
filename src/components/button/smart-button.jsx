// Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import SmartLink from 'components/link/smart-link'

// Component
const Button = props => {
  const isLink = Boolean(props.to)
  const StyledButton = (isLink ? styled(SmartLink) : styled.button)``

  return <StyledButton {...props} />
}

// Property validation
Button.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

// Exports
export default Button
