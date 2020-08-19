import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import {
    getSubscribers,
    isSubscribed,
    subscribe,
    unsubscribe
} from "../../../../actions/subscribe_actions";

function Subscriber(props) {
    const dispatch = useDispatch()

    const userTo = props.userTo;
    const userFrom = props.userFrom;

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const onSubscribe = () => {
        let variables = {
            userTo: userTo,
            userFrom: userFrom
        }

        if (Subscribed) {
            //when user is already subscribed
            dispatch(unsubscribe(variables))
                .then(response => {
                    if (response.payload.success) {
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('You are not allowed to do that. Please Log In stupid')
                    }
                })
        } else {
            dispatch(subscribe(variables))
                .then(response => {
                    if (response.payload.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('You are not allowed to do that. Please Log In stupid')
                    }
                })
        }
    }

    useEffect(() => {
        const variables = {
            userTo: userTo,
            userFrom: userFrom
        }

        dispatch(getSubscribers(variables))
            .then(response => {
                if (response.payload.success) {
                    setSubscribeNumber(response.payload.getSubscribers)
                } else {
                    alert("Failed to get subscriber data")
                }
            })

        dispatch(isSubscribed(variables))
            .then(response => {
                if (response.payload.success) {
                    setSubscribed(response.payload.subscribed);
                } else {
                    console.log("Failed to get subscriber data")
                }
            })
    }, [])

    return (
        <div>
            <Button
                onClick={onSubscribe}
                style={
                    {
                        backgroundColor: `${Subscribed ? '#AAAAAA' : '#fcc8ae'}`,
                        borderRadius: '4px',
                        color: 'white',
                        padding: '10px 16px 30px 16px',
                        fontWeight: '500',
                        textTransform: 'uppercase'
                    }}>
                {Subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
            <p>{SubscribeNumber} Subscribers</p>
        </div>
    )
}

export default Subscriber
