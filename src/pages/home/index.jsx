// Dependencies
import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {css} from 'aphrodite/no-important';

// Components
import Layout from 'pages/layout';
import Thing from 'components/thing';

// Styles
import style from './style';

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
        <main>
          <h1 className={css(style.header)}>Homepage</h1>

          <p>List of names fetched from an API</p>
          <ol>
            {this.props.stores.user.all.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ol>

          <Thing/>
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
