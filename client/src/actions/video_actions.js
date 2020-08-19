import axios from 'axios';
import {
    UPLOAD_FILES,
    THUMBNAIL_VIDEO,
    UPLOAD_VIDEO,
    EDIT_VIDEO,
    GET_VIDEO,
    GET_VIDEOS,
    GET_SUBSCRIPTION_VIDEOS
} from './types';

import { VIDEO_SERVER } from '../components/Config.js';

export function uploadVideo(dataToSubmit) {
    const request = axios.post(`${VIDEO_SERVER}/uploadVideo`, dataToSubmit)
        .then(response => response.data);

    return {
        type: UPLOAD_VIDEO,
        payload: request
    }
}

export function uploadFiles(formData, config) {
    const request = axios.post(`${VIDEO_SERVER}/uploadfiles`, formData, config)
        .then(response => response.data);

    return {
        type: UPLOAD_FILES,
        payload: request
    }
}

export function thumbnail(dataToSubmit) {
    const request = axios.post(`${VIDEO_SERVER}/thumbnail`, dataToSubmit)
        .then(response => response.data);

    return {
        type: THUMBNAIL_VIDEO,
        payload: request
    }
}

export function videoEdit(dataToSubmit, videoId) {
    const request = axios.put(`${VIDEO_SERVER}/${videoId}`, dataToSubmit)
        .then(response => response.data);

    return {
        type: EDIT_VIDEO,
        payload: request
    }
}

export function getVideos() {
    const request = axios.get(`${VIDEO_SERVER}/getVideos`)
        .then(response => response.data);

    return {
        type: GET_VIDEOS,
        payload: request
    }
}

export function getSubscriptionVideos(dataToSubmit) {
    const request = axios.post(`${VIDEO_SERVER}/getSubscriptionVideos`, dataToSubmit)
        .then(response => response.data);

    return {
        type: GET_SUBSCRIPTION_VIDEOS,
        payload: request
    }
}

export function getVideo(dataToSubmit) {
    const request = axios.post(`${VIDEO_SERVER}/getVideo`, dataToSubmit)
        .then(response => response.data);

    return {
        type: GET_VIDEO,
        payload: request
    }
}