import {SAVE_USER_ID} from "../constans";

const defaultCommentReducer = {
    userId: [],
    users: [],
};

export const comments = (state = defaultCommentReducer, action) => {
    const {type} = action;

    switch (type) {
        case SAVE_USER_ID:
            return {
                ...state,
                userId: action.data.ID,
            };
    }

    return state;
};