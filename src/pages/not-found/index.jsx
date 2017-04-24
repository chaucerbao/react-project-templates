// Dependencies
import React, {Component} from 'react';

// Components
import Layout from 'components/layout';
import PageHeader from 'components/page-header';
import PageBody from 'components/page-body';

// Page
class NotFound extends Component {
  render() {
    return (
      <Layout>
        <main role="main">
          <PageHeader>Not found</PageHeader>

          <PageBody>
            <p>Page not found</p>
          </PageBody>
        </main>
      </Layout>
    );
  }
}

// Exports
export default NotFound;
