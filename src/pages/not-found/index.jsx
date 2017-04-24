// Dependencies
import React, {Component} from 'react';

// Components
import Layout from 'components/layout';

// Styles
import {PageHeader, PageBody} from 'styles/page';

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
