import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideos } from "../../../../actions/video_actions";

function SideVideo() {
    const dispatch = useDispatch()

    const [Videos, setVideos] = useState([]);

    useEffect(() => {
        dispatch(getVideos())
            .then(response => {
                if (response.payload.success) {
                    setVideos(response.payload.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])

    const sideVideoItem = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <div style={{ display: 'flex', marginTop: '1rem', padding: '0 1rem' }}  key={index.toString()}>
            <div style={{width: '40%', marginRight: '1rem'}}>
                <a href={`/video/${video._id}`} style={{color: 'gray'}}>
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
                </a>
            </div>
            <div style={{width:'50%'}}>
                <a href={`/video/${video._id}`}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                    <span>{video.author.username}</span><br />
                    <span>{video.views} views</span><br />
                    <span>{minutes} : {seconds}</span><br />
                </a>
            </div>
        </div>
    })

    return (
        <React.Fragment>
            <div style={{marginTop: '3rem'}}>

            </div>
            {sideVideoItem}
        </React.Fragment>
    )
}

export default SideVideo
