import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'antd'

import * as styles from './styles.scss'

import { getAllSingers, deleteSinger } from "../../AC/singers";
import { NewSingerModal } from './NewSingerModal/NewSingerModal'
import { EditSingerModal } from './EditSingerModal/EditSingerModal'

class SingersCmp extends React.Component {
  state = {
    openNewSingerModal: false,
    editSinger: null,
  };

  componentDidMount() {
    this.props.getAllSingers();
  }

  render() {
    const { singers } = this.props;

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
        render: (tag) => (
          <Button type='danger' onClick={(event) => {
            event.stopPropagation();

            this.props.deleteSinger(tag)
          }}>
            Удалить
          </Button>
        ),
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
  return {
    singers: state.singers.singers.map((singer) => {
      return {
        ...singer,
        key: singer.ID,
        tag: singer.ID,
      }
    }),
  }
};

const mapDispatchToProps = ({
  getAllSingers,
  deleteSinger,
});

export const Singers = connect(mapStateToProps, mapDispatchToProps)(SingersCmp);
