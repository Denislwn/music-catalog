import * as React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form } from 'antd'

import * as styles from './styles.scss'

import {authUser} from "../../AC/users";
import {NavLink} from "react-router-dom";

class AuthCmp extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.container}>
                <Form
                    className={styles.form}
                >
                    <h1 className={styles.titleContainer}>
                        Авторизация
                    </h1>
                    <Form.Item label='Логин'>
                        {getFieldDecorator('login', {
                            rules: [
                                { required: true, message: 'Введите логин, пожалуйста' },
                                { max: 32, min: 4, message: 'Логин должен содержать от 4 до 32 символов' },
                            ]
                        })(
                        <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label='Пароль'>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Введите пароль, пожалуйста' },
                                { max: 16, min: 4, message: 'Пароль должен содержать от 4 до 16 символов' },
                            ]
                        })(
                            <Input type='password'/>
                        )}
                    </Form.Item>
                    <div className={styles.buttonContainer}>
                        <NavLink to='/register'>
                            <Button
                                size='large'
                            >
                                Регистрация
                            </Button>
                        </NavLink>
                        <Button
                            type='primary'
                            size='large'
                            onClick={this.onAuthButtonClick}
                        >
                            Войти
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }

    onAuthButtonClick = () => {
        const { form } = this.props;

        form.validateFields((err, values) => {
            if (err) {
                return
            }

            this.props.authUser({
                login: values['login'],
                password: values['password'],
            })
        });
    }
}

const mapDispatchToProps = ({
    authUser,
});

export const Auth = connect(null, mapDispatchToProps)(Form.create()(AuthCmp));
