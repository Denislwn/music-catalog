import * as React from 'react'
import { connect } from 'react-redux'

import {registerUser} from "../../AC/users";

class RegisterCmp extends React.Component {
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
                <button onClick={this.onRegisterButtonClick}>
                    Зарегестрироваться
                </button>
            </div>
        )
    }

    onRegisterButtonClick = () => {
        const { login, password } = this.state;

        if (!login || !password) {
            return
        }

        this.props.registerUser({
            login,
            password,
        })
    }
}

const mapDispatchToProps = ({
    registerUser,
});

export const Register = connect(null, mapDispatchToProps)(RegisterCmp);
