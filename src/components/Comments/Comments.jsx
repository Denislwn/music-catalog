import * as React from 'react'
import {getAllComments, editComment, addNewComment, deleteComment} from "../../AC/comments";
import connect from "react-redux/es/connect/connect";

import * as styles from './styles.scss';

class CommentsCmp extends React.Component {
    state = {
        text: '',
        editId: null
    };

    componentDidMount() {
        this.props.getAllComments();
    }

    render() {
        const { comments } = this.props;

        return (
            <div style={{padding: '20px'}}>
                <input
                    style={{marginRight: '20px'}}
                    value={this.state.text}
                    onChange={(event) => this.setState({ text: event.target.value })}/>
                <button onClick={this.addNewComment}>
                    Добавить
                </button>
                {
                    comments && comments.map((comment) => {
                        const date = new Date(comment.date);
                        const dateFormat = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;

                        return (
                            <div key={comment.ID} className={styles.comment}>
                                <div className={styles.commentInfo}>
                                    <div>{ dateFormat }</div>
                                    <div>{ comment.text }</div>
                                </div>
                                <div className={styles.buttons}>
                                    <span style={{color: 'blue'}} onClick={() => this.editComment(comment)}> (Ред.)</span>
                                    <span style={{color: 'red'}} onClick={() => this.props.deleteComment(comment.ID)}> (Удалить)</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    addNewComment = () => {
        if (!this.state.editId) {
            this.props.addNewComment({
                text: this.state.text,
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

const mapStateToProps = (state) => ({
    comments: state.comments.comments,
});

const mapDispatchToProps = ({
    getAllComments,
    addNewComment,
    editComment,
    deleteComment,
});

export const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsCmp);