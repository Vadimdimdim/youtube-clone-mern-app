import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { videoEdit } from "../../../../actions/video_actions";

import VideoPlayer from './VideoPlayer'

function VideoPlayerLesson(props) {
    const dispatch = useDispatch()

    const [WatchComplete, setWatchComplete] = useState(false)
    const [VideoViews, setVideoViews] = useState(props.videoViews)

    const VideoId = props.videoId

    const handleWatchComplete = (props) => {
        if (props.played && !WatchComplete) {
            setWatchComplete(true)
            {console.log("yo")}
            setVideoViews(VideoViews + 1)
        }

        if (WatchComplete) {
            const variable = {
                views: VideoViews
            }

            dispatch(videoEdit(variable, VideoId))
                .then(response => {
                    if (response.payload.success) {

                    } else {
                        alert('Failed to update views')
                    }
                })
        }
    }

    return (
        <div>
            <VideoPlayer
                videoLocation={props.videoLocation}
                onProgress={handleWatchComplete}
            />
        </div>
    )
}

export default VideoPlayerLesson
