import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer(props) {
    return (
        <div className='player-wrapper' style={{position: 'relative', paddingTop: '56.25%'}}>
            <ReactPlayer
                style={{position: 'absolute', top: '0', left: '0'}}
                url={`http://localhost:5000/${props.videoLocation}`}
                width='100%'
                height='100%'
                onProgress={props.onProgress}
                controls={true}
            />
        </div>
    )
}

export default VideoPlayer
