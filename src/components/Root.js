import React from 'react';
import { Switch, Route, Router, NavLink } from 'react-router-dom';
import {Provider} from 'react-redux';
import localStorageDB from 'localStorageDB';

import * as styles from './styles.scss'

import { store } from '../store';
import {Sings} from "./Sings/Sings";
import {Comments} from "./Comments/Comments";
import {createBrowserHistory} from 'history';
import {SINGS_TABLE, COMMENTS_TABLE} from "../constans";

export const history = createBrowserHistory();

export const dataBase = new localStorageDB("library", localStorage);

if (dataBase.isNew()) {
    dataBase.createTable(SINGS_TABLE, ["name", "author", "description", "album"]);
    dataBase.createTable(COMMENTS_TABLE, ["text", "date"]);

    dataBase.insert(SINGS_TABLE, { name: 'sing1', author: 'author1', description: 'description', album: 'album' });
    dataBase.commit();
}

function Root() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <div className={styles.menu}>
                        <NavLink
                            to='/sings'
                            className={styles.menuItem}
                            activeClassName={styles.activeMenuItem}
                        >
                            Песни
                        </NavLink>
                        <NavLink
                            to='/comments'
                            className={styles.menuItem}
                            activeClassName={styles.activeMenuItem}
                        >
                            Комментарии
                        </NavLink>
                    </div>
                    <Switch>
                        <Route path='/comments' component={Comments}/>
                        <Route path='/sings' component={Sings}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}

export default Root;