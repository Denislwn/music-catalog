import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'antd'

import * as styles from './styles.scss'

import { getAllSings, addNewSing, editSing, deleteSing } from "../../AC/sings";
import {NewSingModal} from "./NewSingModal/NewSingModal";
import {EditSingModal} from "./EditSingModal/EditSingModal";
import Popconfirm from "antd/es/popconfirm"

const text = 'Вы уверены, что хотите удалить песню?';

class SingsCmp extends React.Component {
    state = {
        openNewSingModal: false,
        editSing: null,
    };

    componentDidMount() {
        this.props.getAllSings();
    }

    onConfirm = (event, singId) => {
        event.stopPropagation();
        this.props.deleteSing(Number(singId));
    };

    render() {
        const { sings, isAdmin, userId } = this.props;

        const columns = [
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Автор',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: 'Название альбома',
                dataIndex: 'album',
                key: 'album',
            },
            {
                title: 'Описание',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '',
                key: 'tag',
                dataIndex: 'tag',
                render: (tag) => {
                    const creatorId = tag.split('@@@')[0];
                    const singId = tag.split('@@@')[1];

                    if (isAdmin || String(creatorId) === String(userId)) {
                        return (
                            <Popconfirm
                                placement="top"
                                title={text}
                                onConfirm={(e) => this.onConfirm(e, singId)}
                                onCancel={(event) => event.stopPropagation()}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button type='danger' onClick={(event) => {
                                    event.stopPropagation();
                                }}>
                                    Удалить
                                </Button>
                            </Popconfirm>
                        )
                    }
                }
            },
        ];

        return (
            <div className={styles.container}>
                {sings && sings.length > 0 ?
                    <Table
                      dataSource={sings}
                      columns={columns}
                      rowClassName={() => styles.row}
                      onRow={(record) => {
                          return {
                              onClick: () => this.setState({ editSing: record })
                          };
                      }}
                    /> :
                    <div className={styles.noContent}>
                        Нет Песен
                    </div>
                }
                <div
                    className={styles.addNewSingContainer}
                    onClick={this.changeAddNewModalVisible}
                >+
                </div>
                {this.state.openNewSingModal &&
                    <NewSingModal
                      visible
                      closeModal={() => this.setState({ openNewSingModal: false })}
                    />
                }
                {this.state.editSing &&
                    <EditSingModal
                        visible
                        closeModal={() => this.setState({ editSing: undefined })}
                        sing={this.state.editSing}
                    />
                }
            </div>
        );
    }

    changeAddNewModalVisible = () => this.setState({ openNewSingModal: !this.state.openNewSingModal })
}

const mapStateToProps = (state) => {
    const { singers } = state.singers;
    const { sings } = state.sings;
    const { users, userId } = state.users;
    const currentUser = users.find((user) => String(user.ID) === String(state.users.userId));

    return {
        sings: sings.map((sing) => {
            const currentAuthor = singers.find((singer) => {
                return String(singer.ID) === String(sing.author)
            });

            return {
                ...sing,
                author: (currentAuthor && currentAuthor.name) || 'Удален',
                key: sing.ID,
                tag: sing.creatorId + '@@@' + sing.ID,
            }
        }),
        userId,
        isAdmin: currentUser ? currentUser.login === 'admin' : false,
    }
};

const mapDispatchToProps = ({
    getAllSings,
    addNewSing,
    editSing,
    deleteSing,
});

export const Sings = connect(mapStateToProps, mapDispatchToProps)(SingsCmp);
