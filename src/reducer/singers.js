import { ADD_NEW_SINGER, DELETE_SINGER, EDIT_SINGER, GET_ALL_SINGERS } from '../constans'

const defaultSingsReducer = {
    singers: [],
};

export const singers = (state = defaultSingsReducer, action) => {
    const {type} = action;

    switch (type) {
        case GET_ALL_SINGERS:
            return {
                ...state,
                singers: action.data,
            };
        case ADD_NEW_SINGER:
            return {
                ...state,
                singers: [ ...state.singers, action.data ]
            };
        case EDIT_SINGER:
            const newSingers = state.singers.map((singer) => {
                if (singer.ID === action.data.ID) {
                    return action.data
                }
                return singer
            });
            return {
                ...state,
                singers: newSingers,
            };
        case DELETE_SINGER:
            return {
                ...state,
                singers: state.singers.filter((singer) => String(singer.ID) !== String(action.data))
            }
    }

    return state;
};
