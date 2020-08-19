import {
    GET_LIKES,
    GET_DISLIKES,
    ADD_LIKE,
    REMOVE_LIKE,
    ADD_DISLIKE,
    REMOVE_DISLIKE
} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_LIKES:
            return { ...state, getLikes: action.payload }
        case GET_DISLIKES:
            return { ...state, getDislikes: action.payload }
        case ADD_LIKE:
            return { ...state, addLike: action.payload }
        case REMOVE_LIKE:
            return { ...state, removeLike: action.payload }
        case ADD_DISLIKE:
            return { ...state, addDislike: action.payload }
        case REMOVE_DISLIKE:
            return { ...state, removeDislike: action.payload }
        default:
            return state;
    };
};