import {
    SAVE_COMMENT,
    GET_COMMENTS
} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case SAVE_COMMENT:
            return { ...state, newComment: action.payload }
        case GET_COMMENTS:
            return { ...state, getComments: action.payload }
        default:
            return state;
    };
};