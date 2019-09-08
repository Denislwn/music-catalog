import * as React from 'react'
import { connect } from 'react-redux'
import {Button, Input, Form} from "antd";
import { NavLink } from 'react-router-dom'

import {registerUser} from "../../AC/users";
import * as styles from "../Auth/styles.scss";

class RegisterCmp extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.container}>
                <Form
                    className={styles.form}
                >
                    <h1 className={styles.titleContainer}>
                        Регистрация
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
                        <NavLink to='/auth'>
                            <Button
                                size='large'
                            >
                                Авторизация
                            </Button>
                        </NavLink>
                        <Button
                            type="primary"
                            size='large'
                            onClick={this.onRegisterButtonClick}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }

    onRegisterButtonClick = () => {
        const { form } = this.props;

        form.validateFields((err, values) => {
            if (err) {
                return
            }

            this.props.registerUser({
                login: values['login'],
                password: values['password'],
            })
        });
    }
}

const mapDispatchToProps = ({
    registerUser,
});

export const Register = connect(null, mapDispatchToProps)(Form.create()(RegisterCmp));
