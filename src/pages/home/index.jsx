// Dependencies
import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

// Components
import Layout from 'pages/layout';
import Thing from 'components/thing';
import Link from 'components/link';

// Styles
import {PageHeader, PageBody} from 'styles/page';

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
              <Link external to="https://jsonplaceholder.typicode.com/">
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
