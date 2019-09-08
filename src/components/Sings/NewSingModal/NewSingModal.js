import * as React from 'react'
import {Modal, Button, Form, Input, Select} from 'antd'
import { connect } from 'react-redux'

import {addNewSing} from "../../../AC/sings";

const { Option } = Select;

class NewSingModalCmp extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="Новая песня"
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
                    <Form.Item label='Название'>
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: 'Введите название песни, пожалуйста' },
                                { max: 128, message: 'Максимальное название песни 128 символов' },
                            ]
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label='Автор'>
                        {getFieldDecorator('author', {
                            rules: [
                                { required: true, message: 'Выберите автора, пожалуйста' },
                            ]
                        })(
                            <Select>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label='Название альбома'>
                        {getFieldDecorator('album', {
                            rules: [
                                { max: 128, message: 'Максимальное название песни 128 символов' },
                            ]
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item label='Описание'>
                        {getFieldDecorator('description', {
                            rules: [
                                { max: 128, message: 'Максимальное название песни 128 символов' },
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

            this.props.addNewSing({
                name: values['name'],
                author: values['author'],
                description: values['description'],
                album: values['album'],
            });


            this.props.closeModal();
        });
    };

    handleCancel = () => {
        this.props.closeModal()
    };
}

const mapDispatchToProps = ({
    addNewSing,
});

export const NewSingModal = connect(null, mapDispatchToProps)(Form.create()(NewSingModalCmp));
