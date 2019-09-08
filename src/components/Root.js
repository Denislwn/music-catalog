import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import localStorageDB from 'localStorageDB';

import { store } from '../store';
import { App } from './App/App'
import {createBrowserHistory} from 'history';
import {SINGS_TABLE, COMMENTS_TABLE, USERS_TABLE} from "../constans";
import {Register} from "./Register/Register";
import {Auth} from "./Auth/Auth";

export const history = createBrowserHistory();

export const dataBase = new localStorageDB("library", localStorage);

if (dataBase.isNew()) {
    dataBase.createTable(SINGS_TABLE, ["name", "author", "description", "album"]);
    dataBase.createTable(COMMENTS_TABLE, ["text", "date"]);
    dataBase.createTable(USERS_TABLE, ["login", "password"]);

    dataBase.insert(SINGS_TABLE, { name: 'sing1', author: 'author1', description: 'description', album: 'album' });
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