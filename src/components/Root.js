import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import localStorageDB from 'localstoragedb';

import { store } from '../store';
import { App } from './App/App'
import {createBrowserHistory} from 'history';
import { SINGS_TABLE, COMMENTS_TABLE, USERS_TABLE, SINGERS_TABLE } from '../constans'
import {Register} from "./Register/Register";
import {Auth} from "./Auth/Auth";

export const history = createBrowserHistory();

export const dataBase = new localStorageDB("library", localStorage);

if (dataBase.isNew()) {
    dataBase.createTable(SINGS_TABLE, ["name", "author", "description", "album", "creatorId"]);
    dataBase.createTable(COMMENTS_TABLE, ["text", "date", "creatorId"]);
    dataBase.createTable(USERS_TABLE, ["login", "password"]);
    dataBase.createTable(SINGERS_TABLE, ["name", "country", "group", "creatorId"]);

    dataBase.insert(USERS_TABLE, {
        login: 'admin',
        password: 'admin',
    });
    dataBase.commit();

    dataBase.commit();
}

function Root() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path='/register' component={Register}/>
                    <Route path='/auth' component={Auth}/>
                    <Route path='/' component={App}/>
                </Switch>
            </Router>
        </Provider>
    )
}

export default Root;
