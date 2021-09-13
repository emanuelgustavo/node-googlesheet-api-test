import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ApiTest from './pages/ApiTest';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/apitest" exact component={ApiTest} />
            </Switch>
        </BrowserRouter>
    );
};