import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Tooltip } from 'antd';
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons';

function LikeDislike(props) {

    const [Likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null)

    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    //How many likes does this video or comment have
                    setLikes(response.data.likes.length);

                    //Check if user already liked this video or not
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })

                } else {
                    alert('Failed to get like data')
                }
            })
    }, [])

    useEffect(() => {
        axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    //How many likes does this video or comment have
                    setDislikes(response.data.dislikes.length);

                    //Check if user already liked this video or not
                    response.data.dislikes.map(like => {
                        if (like.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })

                } else {
                    alert('Failed to get dislike data')
                }
            })
    }, [])

    const onLike = () => {
        if (LikeAction === null) {
            axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //if user already disliked video

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }

                    } else {
                        alert('You are not allowed to do that. Please LogIn stupid')
                    }
                })
        } else {
            axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        // alert('Failed to unlike the video')
                        alert('You are not allowed to do that. Please LogIn stupid')
                    }
                })
        }
    }

    const onDislike = () => {
        if (DislikeAction !== null) {
            axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } else {
                        // alert('Failed to undislike the video')
                        alert('You are not allowed to do that. Please LogIn stupid')
                    }
                })
        } else {
            axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //if user already liked the video
                        if (LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        // alert('Failed to dislike the video')
                        alert('You are not allowed to do that. Please LogIn stupid')
                    }
                })
        }
    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    {LikeAction === 'liked' ?
                        <LikeFilled
                            style={{ color: '#fcc8ae' }}
                            onClick={onLike}
                        />
                        :
                        <LikeOutlined
                            onClick={onLike}
                        />
                    }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {DislikeAction === 'disliked' ?
                        <DislikeFilled
                            style={{ color: '#fcc8ae' }}
                            onClick={onDislike}
                        />
                        :
                        <DislikeOutlined
                            onClick={onDislike}
                        />
                    }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislike
