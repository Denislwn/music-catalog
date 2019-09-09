import * as React from 'react'
import {NavLink, Route, Switch} from "react-router-dom";

import * as styles from "./styles.scss";

import {Comments} from "../Comments/Comments";
import {Sings} from "../Sings/Sings";
import {Singers} from "../Singers/Singers";
import {IS_AUTH_USER_ID} from "../../constans";
import { getAllSingers } from '../../AC/singers'
import { connect } from 'react-redux'
import { getAllUsers } from '../../AC/users'

class AppCmp extends React.Component {
    componentDidMount() {
        this.props.getAllSingers();
        this.props.getAllUsers();
    }


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
                      to='/singers'
                      className={styles.menuItem}
                      activeClassName={styles.activeMenuItem}
                    >
                        Исполнители
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
                        onClick={() => localStorage.setItem(IS_AUTH_USER_ID, '')}
                    >
                        Выход
                    </NavLink>
                </div>
                <Switch>
                    <Route path='/comments' component={Comments}/>
                    <Route path='/sings' component={Sings}/>
                    <Route path='/singers' component={Singers}/>
                </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = ({
    getAllSingers,
    getAllUsers,
});

export const App = connect(null, mapDispatchToProps)(AppCmp)
