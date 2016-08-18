// Dependencies
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory';

// Layout
import Application from './application';

// Code-split the routes
function load(page, nextState, callback) {
  require.ensure([], require => callback(null, require(`pages/${page}/index`).default));
}

// Router
const router = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <IndexRoute getComponent={(...args) => load('homepage', ...args)} />
      <Route path="*" getComponent={(...args) => load('not-found-404', ...args)} />
    </Route>
  </Router>
);

export default router;
