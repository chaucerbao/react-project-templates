// Dependencies
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Layout
import Application from './application';

// Code-splitting the routes
function homepage(nextState, callback) {
  require.ensure([], require => callback(null, require('pages/homepage').default));
}

function notFound404(nextState, callback) {
  require.ensure([], require => callback(null, require('pages/not-found-404').default));
}

// Router
const router = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <IndexRoute getComponent={homepage} />
      <Route path="*" getComponent={notFound404} />
    </Route>
  </Router>
);

export default router;
