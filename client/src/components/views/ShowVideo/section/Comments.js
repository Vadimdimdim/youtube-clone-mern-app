import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Button, Input } from 'antd';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';


const { TextArea } = Input;

function Comments(props) {

    const [Comment, setComment] = useState("");
    const user = useSelector(state => state.user)

    const onSubmit = (event) => {
        event.preventDefault();

        const variable = {
            content: Comment,
            author: user.userData._id,
            postId: props.postId
        }

        axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                    setComment('');
                    props.refreshFunction(response.data.result)
                } else {
                    // alert('Failed to save comment')
                    alert('You are not allowed to do that. Please LogIn stupid')
                }
            })
    }

    const handleChange = (event) => {
        setComment(event.currentTarget.value);
    }

    return (
        <div>
            <br />
            <p> Comments </p>
            <hr />
            {/* Comment Lists  */}

            {props.CommentList && props.CommentList.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentList={props.CommentList} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Add a public comment..."
                    type="danger"
                />
                <Button style={{ width: '20%', height: '59.5px' }} onClick={onSubmit} >Submit</Button>
            </form>

        </div>
    )
}

export default Comments
