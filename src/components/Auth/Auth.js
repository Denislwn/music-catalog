import * as React from 'react'
import { connect } from 'react-redux'

import {authUser} from "../../AC/users";

class AuthCmp extends React.Component {
    state = {
        login: '',
        password: '',
    };

    render() {
        return (
            <div>
                <input
                    value={this.state.login}
                    onChange={(event) => this.setState({ login: event.target.value })}
                />
                <input
                    type='password'
                    value={this.state.password}
                    onChange={(event) => this.setState({ password: event.target.value })}
                />
                <button
                    onClick={this.onRegisterButtonClick}
                >
                    Войти
                </button>
            </div>
        )
    }

    onRegisterButtonClick = () => {
        const { login, password } = this.state;

        if (!login || !password) {
            return
        }

        this.props.authUser({
            login,
            password,
        })
    }
}

const mapDispatchToProps = ({
    authUser,
});

export const Auth = connect(null, mapDispatchToProps)(AuthCmp);
