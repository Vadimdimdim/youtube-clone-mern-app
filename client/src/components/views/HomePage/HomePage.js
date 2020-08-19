import React, { useState, useEffect } from 'react'
import { Card, Avatar, Col, Typography, Row, Tooltip } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getVideos } from "../../../actions/video_actions";

const { Title } = Typography;
const { Meta } = Card;

function HomePage() {
    const dispatch = useDispatch()

    const [Videos, setVideos] = useState([])

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

    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} sm={12} xs={24} key={index.toString()} style={{ marginBottom: '2em' }}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`}>
                    <Tooltip title={video.title}>
                        <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                    </Tooltip>
                    <div className=" duration"
                        style={{
                            bottom: 0, right: 0, position: 'absolute', margin: '4px',
                            color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
                            padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px', fontSize: '12px',
                            fontWeight: '500', lineHeight: '12px'
                        }}>
                        {seconds < 10 ? <span>{minutes} : 0{seconds}</span> : <span>{minutes} : {seconds}</span>}
                    </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.author.profilePicture} />
                }
                title={video.title}
            />
            <span>{video.author.username} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views} views</span> <br />
            <span style={{ marginLeft: '3rem' }}> {moment(video.createdAt).calendar()} </span>
        </Col>
    })


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>

            <hr />

            <Row gutter={30}>
                {renderCards}
            </Row>
        </div>
    )
}

export default HomePage