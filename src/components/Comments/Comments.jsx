import * as React from 'react'
import {getAllComments, editComment, addNewComment, deleteComment} from "../../AC/comments";
import {Comment, Form} from 'antd'
import connect from "react-redux/es/connect/connect";

import * as styles from './styles.scss';

import Tooltip from 'antd/es/tooltip'
import moment from 'moment'
import List from 'antd/es/list'
import TextArea from 'antd/es/input/TextArea'
import Button from 'antd/es/button'
import Icon from 'antd/es/icon'
import Avatar from "antd/es/avatar";

class CommentsCmp extends React.Component {
    state = {
        text: '',
        editId: null
    };

    componentDidMount() {
        this.props.getAllComments();
    }

    render() {
        const { comments, isAdmin, userId } = this.props;

        return (
            <div style={{padding: '20px'}}>
                {comments.length === 0  &&
                <div className={styles.noContent}>
                    Нет комментариев
                </div>
                }
                {comments.length > 0 &&
                    <List
                      dataSource={comments}
                      header={<span style={{ color: 'white', fontWeight: '600' }}>Всего комментариев: {comments.length}</span>}
                      itemLayout="horizontal"
                      renderItem={comment => {
                          const actions = [];

                          if (isAdmin || String(comment.creator.ID) === String(userId)) {
                              actions.push(
                                  [
                                      <span key="comment-basic-like">
                                <Tooltip title="Редактировать">
                                  <Icon
                                      type="edit"
                                      onClick={() => this.editComment(comment)}
                                  />
                                </Tooltip>
                              </span>,
                                      <span key="comment-basic-delete">
                                <Tooltip title="Удалить комментарий">
                                  <Icon
                                      type="delete"
                                      onClick={() => this.props.deleteComment(comment.ID)}
                                  />
                                </Tooltip>
                              </span>,
                                  ]
                              )
                          }

                          return (
                              <Comment
                                  avatar={<Avatar size={64} icon="user" />}
                                  actions={actions}
                                  key={comment.ID}
                                  author={(comment.creator && comment.creator.login) || 'Нет пользователя'}
                                  className={styles.comment}
                                  content={
                                      <span>
                                {comment.text}
                                </span>
                                  }
                                  datetime={
                                      <Tooltip title={moment(comment.date).format('YYYY-MM-DD HH:mm:ss')}>
                                          <span>{moment(comment.date).locale('ru').fromNow()}</span>
                                      </Tooltip>
                                  }
                              />
                          )
                      }
                      }
                    />
                }
                <div style={{ marginTop: '24px' }}>
                    <Form.Item>
                        <TextArea
                          rows={4}
                          value={this.state.text}
                          placeholder='Введите новый комментарий'
                          onChange={(event) => this.setState({ text: event.target.value })}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" onClick={this.addNewComment} type="primary">
                            {this.state.editId ? <span>Редактировать</span> : <span>Добавить комментарий</span>}
                        </Button>
                        {
                            this.state.editId &&
                            <Button style={{ marginLeft: '16px' }} onClick={() => this.setState({ editId: null, text: '' })} type="danger">
                                Отмена
                            </Button>
                        }
                    </Form.Item>
                </div>
            </div>
        );
    }

    addNewComment = () => {
        if (!this.state.editId) {
            this.props.addNewComment({
                text: this.state.text,
                creatorId: this.props.userId,
            });
            this.setState({
                text: ''
            })
        } else {
            this.props.editComment(this.state.editId, {
                text: this.state.text,
            });
            this.setState({
                text: '',
                editId: null,
            })
        }
    };

    editComment = (comment) => {
        this.setState({
            editId: comment.ID,
            text: comment.text,
        })
    }
}

const mapStateToProps = (state) => {
    const { users } = state.users;
    const currentUser = users.find((user) => String(user.ID) === String(state.users.userId));

    return {
        comments: state.comments.comments.map((comment) => {
            return {
                ...comment,
                creator: users.find((user) => String(user.ID) === String(comment.creatorId))
            }
        }),
        userId: state.users.userId,
        isAdmin: currentUser ? currentUser.login === 'admin' : false,
    };
};

const mapDispatchToProps = ({
    getAllComments,
    addNewComment,
    editComment,
    deleteComment,
});

export const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsCmp);
