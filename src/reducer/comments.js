import {ADD_NEW_COMMENT, DELETE_COMMENT, EDIT_COMMENT, GET_ALL_COMMENTS} from "../constans";

const defaultCommentReducer = {
    comments: [],
};

export const comments = (state = defaultCommentReducer, action) => {
    const {type} = action;

    switch (type) {
        case GET_ALL_COMMENTS:
            return {
                ...state,
                comments: action.data,
            };
        case ADD_NEW_COMMENT:
            return {
                ...state,
                comments: [ ...state.comments, action.data ]
            };
        case EDIT_COMMENT:
            const newComments = state.comments.map((comment) => {
                if (comment.ID === action.data.ID) {
                    return action.data
                }
                return comment
            });
            return {
                ...state,
                comments: newComments,
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter((comment) => comment.ID !== action.data)
            }
    }

    return state;
};