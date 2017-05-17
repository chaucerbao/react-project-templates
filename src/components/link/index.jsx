// Dependencies
import React from 'react'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'

// Component
const Link = ({ router, ...props }) => {
  const isExternalLink = /^\w+:\/\//.test(props.to)

  return isExternalLink
    ? <a {...props} href={props.to} target='_blank' />
    : <router.Link {...props} />
}

// Property validation
Link.propTypes = {
  router: PropTypes.shape({
    Link: PropTypes.func.isRequired
  }).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
}

// Exports
export default inject('router')(Link)
