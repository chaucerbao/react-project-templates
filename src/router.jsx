// Dependencies
import React, {PropTypes} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'mobx-react';

// Pages
const fetch = page =>
  () => {
    const Page = require(`pages/${page}/index`).default;
    return <Page/>;
  };

// Router
const Router = ({stores}) => {
  return (
    <BrowserRouter>
      <Provider stores={stores}>
        <Switch>
          <Route exact path="/" render={fetch('home')}/>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

Router.propTypes = {
  stores: PropTypes.object.isRequired
};

// Exports
export default Router;
