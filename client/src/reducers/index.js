import { combineReducers } from "redux";
import user from "./user_reducer";
import video from "./video_reducer"

const rootReducer = combineReducers({
    user,
    video
});

export default rootReducer;