import { GET_ALL_USERS, IS_AUTH_USER_ID, SAVE_USER_ID } from '../constans'

const defaultCommentReducer = {
    userId: localStorage.getItem(IS_AUTH_USER_ID),
    users: [],
};

export const users = (state = defaultCommentReducer, action) => {
    const {type} = action;

    switch (type) {
        case SAVE_USER_ID:
            return {
                ...state,
                userId: action.data.ID,
            };
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.data,
            }
    }

    return state;
};
