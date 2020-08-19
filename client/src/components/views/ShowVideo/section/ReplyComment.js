import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenComments, setOpenComments] = useState(false)

    const handleChange = () => {
        setOpenComments(!OpenComments)
    }

    useEffect(() => {
        let commentNumber = 0;
        props.CommentList.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentList, props.parentCommentId])

    let renderReplyComments = (parentCommentId) =>
        props.CommentList.map((comment, index) => (
            <React.Fragment key={index}>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px'}}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentList={props.CommentList} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
        ))

    return (
        <div>
            {ChildCommentNumber > 1 && OpenComments &&
                <a style={{ width: '100%', fontSize: '14px', margin: 0, color: 'gray' }} onClick={handleChange}>
                    <p>Hide replies</p>
                </a>
            }

            {ChildCommentNumber > 1 && !OpenComments &&
                <a style={{ width: '100%', fontSize: '14px', margin: 0, color: 'gray' }} onClick={handleChange}>
                    <p>View {ChildCommentNumber} replies</p>
                </a>
            }

            {ChildCommentNumber === 1 && OpenComments &&
                <a style={{ width: '100%', fontSize: '14px', margin: 0, color: 'gray' }} onClick={handleChange}>
                    <p>Hide reply</p>
                </a>
            }

            {ChildCommentNumber === 1 && !OpenComments &&
                <a style={{ width: '100%', fontSize: '14px', margin: 0, color: 'gray' }} onClick={handleChange}>
                    <p>View reply</p>
                </a>
            }

            {OpenComments &&
                renderReplyComments(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment
