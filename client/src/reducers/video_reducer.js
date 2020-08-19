import {
    UPLOAD_FILES,
    THUMBNAIL_VIDEO,
    UPLOAD_VIDEO,
    EDIT_VIDEO,
    GET_VIDEO,
    GET_VIDEOS,
    GET_SUBSCRIPTION_VIDEOS
} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case UPLOAD_FILES:
            return { ...state, uploadFiles: action.payload }
        case THUMBNAIL_VIDEO:
            return { ...state, thumbnail: action.payload }
        case UPLOAD_VIDEO:
            return { ...state, uploadVideo: action.payload }
        case EDIT_VIDEO:
            return { ...state, editVideo: action.payload }
        case GET_VIDEO:
            return { ...state, getVideo: action.payload }
        case GET_VIDEOS:
            return { ...state, getVideos: action.payload }
        case GET_SUBSCRIPTION_VIDEOS:
            return { ...state, getSubscriptionVieos: action.payload }
        default:
            return state;
    };
};