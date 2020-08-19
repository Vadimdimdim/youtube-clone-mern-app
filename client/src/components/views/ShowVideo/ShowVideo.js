import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getVideo } from "../../../actions/video_actions";

import SideVideo from './section/SideVideo';
import Comments from './section/Comments';
import Subscriber from './section/Subscriber';
import LikeDislike from './section/LikeDislike';
import VideoPlayerLesson from './section/VideoPlayerLesson';

import { SmileOutlined } from '@ant-design/icons'

function ShowVideo(props) {
    const dispatch = useDispatch()

    const [Video, setVideo] = useState([]);
    const [CommentList, setCommentList] = useState([])
    const videoId = props.match.params.id;

    const variable = {
        videoId: videoId,
    }

    useEffect(() => {
        dispatch(getVideo(variable))
            .then(response => {
                if (response.payload.success) {
                    setVideo(response.payload.video);
                } else {
                    alert("Failed get video");
                }
            })

        //populate comments
        axios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    setCommentList(response.data.comments);
                } else {
                    alert("Couldn't get comments");
                }
            })
    }, [])

    const updateComment = (newComment) => {
        setCommentList(CommentList.concat(newComment))
    }

    if (Video.author) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 1em' }}>
                        <VideoPlayerLesson videoLocation={Video.filePath} videoViews={Video.views} videoId={videoId} />
                        <List.Item
                            actions={[
                                <LikeDislike
                                    video videoId={videoId} userId={localStorage.getItem('userId')}
                                />,
                                <Subscriber
                                    userTo={Video.author._id} userFrom={localStorage.getItem('userId')}
                                />
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.author && Video.author.profilePicture} />}
                                title={<p style={{ fontSize: '1rem' }}>{Video.title}</p>}
                                description={Video.author.username}
                            />
                        </List.Item>

                        <div style={{ marginLeft: '3rem' }}>
                            <hr />
                            <p>Description:</p>
                            <div>
                                {Video.description}
                            </div>
                        </div>

                        <Comments CommentList={CommentList} postId={Video._id} refreshFunction={updateComment} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div style={{textAlign:'center', marginTop: '4rem', fontSize: '5rem'}}>
                <SmileOutlined spin />
                <p>LOADING</p>
            </div> 
        )
    }
}

export default ShowVideo
