import {GET_ALL_COMMENTS, EDIT_COMMENT, DELETE_COMMENT, ADD_NEW_COMMENT} from "../constans";
import { CommentService } from "../services/commentService";
import { notificationSuccess } from '../index'

export const getAllComments = () => {
    return {
        type: GET_ALL_COMMENTS,
        data: CommentService.getCommentList(),
    }
};

export const addNewComment = (newCommentData) => {
    const newComment = CommentService.addNewComment(newCommentData);

    return {
        type: ADD_NEW_COMMENT,
        data: newComment,
    }
};

export const editComment = (commentId, comment) => {
    const newComment = CommentService.editComment({...comment, ID: commentId});

    return {
        type: EDIT_COMMENT,
        data: newComment,
    }
};

export const deleteComment = (commentId) => {
    CommentService.deleteComment(commentId);

    notificationSuccess('Комментарий удален');

    return {
        type: DELETE_COMMENT,
        data: commentId,
    }
};
