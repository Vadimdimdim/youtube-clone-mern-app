import React, { useState } from 'react'
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { saveComment } from "../../../../actions/comment_actions";

import { Comment, Avatar, Button, Input } from 'antd';
import LikeDislike from './LikeDislike';

const { TextArea } = Input;

function SingleComment(props) {
    const dispatch = useDispatch()

    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)
    const user = useSelector(state => state.user)

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            author: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }

        dispatch(saveComment(variables))
            .then(response => {
                if (response.payload.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.payload.result)
                } else {
                    alert('You are not allowed to do that. Please Log In stupid')
                }
            })

        // axios.post('/api/comment/saveComment', variables)
        //     .then(response => {
        //         if (response.data.success) {
        //             // console.log('Reply', response.data.result)
        //             setCommentValue("")
        //             setOpenReply(!OpenReply)
        //             props.refreshFunction(response.data.result)
        //         } else {
        //             // alert('Failed to save comment')
        //             alert('You are not allowed to do that. Please LogIn stupid')
        //         }
        //     })
    }

    const handleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const actions = [
        <LikeDislike comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.author.username}
                avatar={
                    <Avatar
                        src={props.comment.author.profilePicture}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>

            {OpenReply &&
                <form style={{ display: 'flex', marginBottom: '1rem' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="Reply to this comment..."
                    />
                    <br />
                    <Button style={{ width: '20%', height: '59.5px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment
