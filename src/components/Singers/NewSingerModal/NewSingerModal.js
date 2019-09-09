import * as React from 'react'
import {Modal, Button, Form, Input } from 'antd'
import { connect } from 'react-redux'

import {addNewSinger} from "../../../AC/singers";


class NewSingerModalCmp extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="Новая исполнитель"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        Создать
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label='Имя'>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: 'Введите имя исполнителя, пожалуйста' },
                                { max: 128, message: 'Максимальное имя исполнителя 128 символов' },
                            ]
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label='Страна исполнителя'>
                        {getFieldDecorator('country', {
                            rules: [
                                { required: true, message: 'Введите страну исполнителя, пожалуйста' },
                                { max: 128, message: 'Максимальное длинна страны исполнителя 128 символов' },
                            ]
                        })(
                          <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label='Группа исполнителя'>
                        {getFieldDecorator('group', {
                            rules: [
                                { max: 128, message: 'Максимальное название группы 128 символов' },
                            ]
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

    handleOk = () => {
        const { form } = this.props;

        form.validateFields((err, values) => {
            if (err) {
                return
            }

            this.props.addNewSinger({
                name: values['name'],
                country: values['country'],
                group: values['group'],
            });


            this.props.closeModal();
        });
    };

    handleCancel = () => {
        this.props.closeModal()
    };
}

const mapDispatchToProps = ({
    addNewSinger,
});

export const NewSingerModal = connect(null, mapDispatchToProps)(Form.create()(NewSingerModalCmp));
