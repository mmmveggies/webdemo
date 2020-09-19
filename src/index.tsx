import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const pages = require.context('./pages', false, /\.tsx$/, 'sync');
const routes = pages.keys().map(key => ({
  key,
  path: key.replace(/\.(.*)\.tsx$/, '$1'),
  component: pages(key).default,
}));

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {routes.map(props => (
        <Route {...props} />
      ))}
      <Route>
        <h1>INDEX</h1>
        <ul>
          {routes.map(({ key, path }) => (
            <Link key={key} to={path}>
              {path}
            </Link>
          ))}
        </ul>
      </Route>
    </Switch>
  </BrowserRouter>,
  document.querySelector('#container')
);

if (module && module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler(status => {
    if (status === 'prepare') console.clear();
  });
}
