import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/repositories/:repository+" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
