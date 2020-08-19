import axios from 'axios';
import {
    GET_SUBSCRIBERS,
    IS_SUBSCRIBED,
    SUBSCRIBE,
    UNSUBSCRIBED
} from './types';

import { SUBSCRIBE_SERVER } from '../components/Config.js';

export function getSubscribers(dataToSubmit) {
    const request = axios.post(`${SUBSCRIBE_SERVER}/getSubscribers`, dataToSubmit)
        .then(response => response.data);

    return {
        type: GET_SUBSCRIBERS,
        payload: request
    }
}

export function isSubscribed(dataToSubmit) {
    const request = axios.post(`${SUBSCRIBE_SERVER}/isSubscribed`, dataToSubmit)
        .then(response => response.data);

    return {
        type: IS_SUBSCRIBED,
        payload: request
    }
}

export function subscribe(dataToSubmit) {
    const request = axios.post(`${SUBSCRIBE_SERVER}/subscribe`, dataToSubmit)
        .then(response => response.data);

    return {
        type: SUBSCRIBE,
        payload: request
    }
}

export function unsubscribe(dataToSubmit) {
    const request = axios.post(`${SUBSCRIBE_SERVER}/unsubscribe`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UNSUBSCRIBED,
        payload: request
    }
}