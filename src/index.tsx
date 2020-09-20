import ReactDOM from 'react-dom';
import React from 'react';
import { Switch, Route, Link, HashRouter } from 'react-router-dom';

const pages = require.context('./pages', false, /\.tsx$/, 'sync');
const routes = pages.keys().map(key => ({
  key,
  path: key.replace(/\.(.*)\.tsx$/, '$1'),
  component: pages(key).default,
}));

ReactDOM.render(
  <HashRouter>
    <Switch>
      {routes.map(props => (
        <Route {...props} />
      ))}
      <Route>
        <div style={{ padding: '1em' }}>
          <h1>index</h1>
          <ul>
            {routes.map(({ key, path }) => (
              <li key={key}>
                <h3>
                  <Link to={path}>{path}</Link>
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </Route>
    </Switch>
  </HashRouter>,
  document.querySelector('#container')
);

if (module && module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler(status => {
    if (status === 'prepare') console.clear();
  });
}
