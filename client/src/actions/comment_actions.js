import axios from 'axios';
import {
    SAVE_COMMENT,
    GET_COMMENTS
} from './types';

import { COMMENT_SERVER } from '../components/Config.js';

export function saveComment(dataToSubmit) {
    const request = axios.post(`${COMMENT_SERVER}/saveComment`, dataToSubmit)
        .then(response => response.data);

    return {
        type: SAVE_COMMENT,
        payload: request
    }
}

export function getComments(dataToSubmit) {
    const request = axios.post(`${COMMENT_SERVER}/getComments`, dataToSubmit)
        .then(response => response.data);

    return {
        type: GET_COMMENTS,
        payload: request
    }
}