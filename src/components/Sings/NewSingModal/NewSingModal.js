import * as React from 'react'
import {Modal, Button, Form, Input, Select} from 'antd'
import { connect } from 'react-redux'

import {addNewSing} from "../../../AC/sings";

const { Option } = Select;

class NewSingModalCmp extends React.Component {
    render() {
        const { singers } = this.props;
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
                                {singers.map((singer) => {
                                    return (
                                      <Option key={singer.ID}>
                                          {singer.name}
                                      </Option>
                                    )
                                })}
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
                description: values['description'] || '-',
                album: values['album'] || '-',
                creatorId: this.props.userId,
            });

            this.props.closeModal();
        });
    };

    handleCancel = () => {
        this.props.closeModal()
    };
}

const mapStateToProps = (state) => {
    return {
        userId: state.users.userId,
        singers: state.singers.singers,
    }
};

const mapDispatchToProps = ({
    addNewSing,
});

export const NewSingModal = connect(mapStateToProps, mapDispatchToProps)(Form.create()(NewSingModalCmp));
