import {
    GET_SUBSCRIBERS,
    IS_SUBSCRIBED,
    SUBSCRIBE,
    UNSUBSCRIBED
} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_SUBSCRIBERS:
            return { ...state, getSubscribers: action.payload }
        case IS_SUBSCRIBED:
            return { ...state, isSubscribed: action.payload }
        case SUBSCRIBE:
            return { ...state, subscribe: action.payload }
        case UNSUBSCRIBED:
            return { ...state, unsubscribe: action.payload }
        default:
            return state;
    };
};