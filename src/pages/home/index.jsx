// Dependencies
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

// Components
import Layout from 'components/layout'
import PageHeader from 'components/page-header'
import PageBody from 'components/page-body'
import Button from 'components/button/styled'

// Page
class Home extends Component {
  async componentDidMount () {
    try {
      await this.props.stores.user.getAll()
    } catch (err) {}
  }

  render () {
    return (
      <Layout>
        <main role='main'>
          <PageHeader>Homepage</PageHeader>

          <PageBody>
            <p>
              List of names fetched from
              {' '}
              <Button to='https://jsonplaceholder.typicode.com/'>
                an API
              </Button>
            </p>

            <ol>
              {this.props.stores.user.all.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ol>
          </PageBody>
        </main>
      </Layout>
    )
  }
}

// Property validation
Home.propTypes = {
  stores: PropTypes.shape({
    user: PropTypes.object.isRequired
  }).isRequired
}

// Exports
export default inject('stores')(observer(Home))
