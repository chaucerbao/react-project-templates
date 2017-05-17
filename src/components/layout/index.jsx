// Dependencies
import React, { Component } from 'react'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'

// Components
import SiteHeader from 'components/site-header'
import SiteFooter from 'components/site-footer'
import Link from 'components/link/styled'

// Component
class Layout extends Component {
  render () {
    return (
      <div>
        <SiteHeader>
          <nav role='navigation'>
            <Link to='/'>
              Home
            </Link>
            {' '}
            <Link to='/does-not-exist'>
              Not found
            </Link>
          </nav>
        </SiteHeader>
        {this.props.children}
        <SiteFooter>
          The end
        </SiteFooter>
      </div>
    )
  }
}

// Property validation
Layout.propTypes = {
  children: PropTypes.node.isRequired
}

// Exports
export default inject('router')(Layout)
