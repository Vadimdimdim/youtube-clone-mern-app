import axios from 'axios';
import {
    GET_LIKES,
    GET_DISLIKES,
    ADD_LIKE,
    REMOVE_LIKE,
    ADD_DISLIKE,
    REMOVE_DISLIKE
} from './types';

import { LIKE_SERVER } from '../components/Config.js';

export function getLikes(dataToSubmit) {
    const request = axios.post(`${LIKE_SERVER}/getLikes`, dataToSubmit)
        .then(response => response.data);

    return {
        type: GET_LIKES,
        payload: request
    }
}

export function getDislikes(dataToSubmit) {
    const request = axios.post(`${LIKE_SERVER}/getDislikes`, dataToSubmit)
        .then(response => response.data);

    return {
        type: GET_DISLIKES,
        payload: request
    }
}

export function addLike(dataToSubmit) {
    const request = axios.post(`${LIKE_SERVER}/addLike`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_LIKE,
        payload: request
    }
}

export function removeLike(dataToSubmit) {
    const request = axios.post(`${LIKE_SERVER}/removeLike`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REMOVE_LIKE,
        payload: request
    }
}

export function addDislike(dataToSubmit) {
    const request = axios.post(`${LIKE_SERVER}/addDislike`, dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_DISLIKE,
        payload: request
    }
}

export function removeDislike(dataToSubmit) {
    const request = axios.post(`${LIKE_SERVER}/removeDislike`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REMOVE_DISLIKE,
        payload: request
    }
}