// Dependencies
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';

// Components
import Layout from 'components/layout';
import Thing from 'components/thing';
import Link from 'components/link';
import PageHeader from 'components/page-header';
import PageBody from 'components/page-body';

// Page
class Home extends Component {
  async componentDidMount() {
    try {
      await this.props.stores.user.getAll();
    } catch (err) {}
  }

  render() {
    return (
      <Layout>
        <main role="main">
          <PageHeader>Homepage</PageHeader>

          <PageBody>
            <p>
              List of names fetched from
              {' '}
              <Link to="https://jsonplaceholder.typicode.com/">
                an API
              </Link>
            </p>

            <ol>
              {this.props.stores.user.all.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ol>

            <Thing/>
          </PageBody>
        </main>
      </Layout>
    );
  }
}

// Property validation
Home.propTypes = {
  stores: PropTypes.shape({
    user: PropTypes.object.isRequired
  }).isRequired
};

// Exports
export default inject('stores')(observer(Home));
