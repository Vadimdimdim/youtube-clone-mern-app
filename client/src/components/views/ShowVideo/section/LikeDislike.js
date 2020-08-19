import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    getLikes,
    getDislikes,
    addLike,
    removeLike,
    addDislike,
    removeDislike
} from "../../../../actions/like_actions";

import { Tooltip } from 'antd';
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons';

function LikeDislike(props) {
    const dispatch = useDispatch()

    const [Likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null)

    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variables = {};

    if (props.video) {
        variables = {
            videoId: props.videoId,
            userId: props.userId
        }
    } else {
        variables = {
            commentId: props.commentId,
            userId: props.userId
        }
    }

    useEffect(() => {
        dispatch(getLikes(variables))
            .then(response => {
                if (response.payload.success) {
                    //How many likes does this video/comment have
                    setLikes(response.payload.likes.length);

                    //Check if user already liked this video/comment
                    response.payload.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert("Failed to get likes");
                }
            })

        dispatch(getDislikes(variables))
            .then(response => {
                if (response.payload.success) {
                    //How many likes does this video or comment have
                    setDislikes(response.payload.dislikes.length);

                    //Check if user already liked this video or not
                    response.payload.dislikes.map(like => {
                        if (like.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert("Failed to get dislikes");
                }
            })
    }, [])

    const onLike = () => {
        if (LikeAction === null) {
            dispatch(addLike(variables))
                .then(response => {
                    if (response.payload.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //if user already disliked video

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('You are not allowed to do that. Please Log In stupid')
                    }
                })
        } else {
            dispatch(removeLike(variables))
                .then(response => {
                    if (response.payload.success) {
                        getLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('You are not allowed to do that. Please Log In stupid')
                    }
                })
        }
    }

    const onDislike = () => {
        if (DislikeAction !== null) {
            dispatch(removeDislike(variables))
                .then(response => {
                    if (response.payload.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } else {
                        alert('You are not allowed to do that. Please Log In stupid')
                    }
                })
        } else {
            dispatch(addDislike(variables))
                .then(response => {
                    if (response.payload.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //if user already liked the video
                        if (LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('You are not allowed to do that. Please Log In stupid')
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
