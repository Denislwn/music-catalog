import * as React from 'react'
import {NavLink, Route, Switch} from "react-router-dom";

import * as styles from "./styles.scss";

import {Comments} from "../Comments/Comments";
import {Sings} from "../Sings/Sings";
import {IS_AUTH} from "../../constans";


export class App extends React.Component {
    render() {
        return (
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
                    <NavLink
                        to='/auth'
                        className={styles.menuItem}
                        activeClassName={styles.activeMenuItem}
                        onClick={() => localStorage.setItem(IS_AUTH, 'false')}
                    >
                        Выход
                    </NavLink>
                </div>
                <Switch>
                    <Route path='/comments' component={Comments}/>
                    <Route path='/sings' component={Sings}/>
                </Switch>
            </div>
        )
    }
}
