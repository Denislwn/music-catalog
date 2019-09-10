import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'antd'

import * as styles from './styles.scss'

import { getAllSingers, deleteSinger } from "../../AC/singers";
import { NewSingerModal } from './NewSingerModal/NewSingerModal'
import { EditSingerModal } from './EditSingerModal/EditSingerModal'
import Popconfirm from "antd/es/popconfirm"

const text = 'Вы уверены, что хотите удалить исполнителя? Все его песни будут удалены';

class SingersCmp extends React.Component {
  state = {
    openNewSingerModal: false,
    editSinger: null,
  };

  componentDidMount() {
    this.props.getAllSingers();
  }

  onConfirm = (event, tag) => {
      event.stopPropagation();
      this.props.deleteSinger(tag);
  };

  render() {
    const { singers, isAdmin, userId } = this.props;

    const columns = [
      {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Страна',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'Группа',
        dataIndex: 'group',
        key: 'group',
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
        {singers && singers.length > 0 ?
          <Table
            dataSource={singers}
            columns={columns}
            rowClassName={() => styles.row}
            onRow={(record) => {
              return {
                onClick: () => this.setState({ editSinger: record })
              };
            }}
          /> :
          <div className={styles.noContent}>
            Нет исполнителей
          </div>
        }
        <div
          className={styles.addNewSingContainer}
          onClick={this.changeAddNewModalVisible}
        >+
        </div>
        {
          this.state.openNewSingerModal &&
            <NewSingerModal
              visible
              closeModal={() => this.setState({ openNewSingerModal: false })}
            />
        }
        {this.state.editSinger &&
          <EditSingerModal
            visible
            closeModal={() => this.setState({ editSinger: undefined })}
            singer={this.state.editSinger}
          />
        }
      </div>
    );
  }

  changeAddNewModalVisible = () => this.setState({ openNewSingerModal: !this.state.openNewSingModal })
}

const mapStateToProps = (state) => {
  const { users, userId } = state.users;
  const currentUser = users.find((user) => String(user.ID) === String(state.users.userId));

  return {
    singers: state.singers.singers.map((singer) => {
      return {
        ...singer,
        key: singer.ID,
        tag: singer.creatorId + '@@@' + singer.ID,
      }
    }),
    userId,
    isAdmin: currentUser ? currentUser.login === 'admin' : false,
  }
};

const mapDispatchToProps = ({
  getAllSingers,
  deleteSinger,
});

export const Singers = connect(mapStateToProps, mapDispatchToProps)(SingersCmp);
