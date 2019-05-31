import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Login from './pages/login';
import Main from './layout/Main';


export default (
    <Route>
        <Switch>
            <Redirect from="/" to="/login" exact={true} />
            <Route path="/login" component={Login} />
            <Route path="*" component={Main} />
        </Switch>
   </Route>
);
