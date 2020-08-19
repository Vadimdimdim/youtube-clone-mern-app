import React, {useEffect, useState} from 'react';
import {Button} from 'antd';
import axios from 'axios';

function Subscriber(props) {
    const userTo = props.userTo;
    const userFrom = props.userFrom;

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const onSubscribe = () => {
        let subscribeVariables = {
            userTo: userTo,
            userFrom: userFrom
        }
        // console.log(subscribeVariables)

        if(Subscribed){
            //when we are alreay subscribed
            axios.post('/api/subscribe/unSubscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('You are not allowed to do that. Please LogIn stupid')
                    }
                })
        }else{
            axios.post('/api/subscribe/subscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert('You are not allowed to do that. Please LogIn stupid')
                    }
                })
        }
    }

    useEffect(() => {
        const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom}

        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if(response.data.success){
                    // console.log(response.data.subscribeNumber);
                }else{
                    alert("Failed to get subscriber data")
                }
            })
            .catch(err => {
                console.log(err);
            })

        axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if(response.data.success){
                    // console.log(response.data.subscribed);
                    setSubscribed(response.data.subscribed);
                }else{
                    // alert("Failed to get subscriber data")
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <Button 
                onClick={onSubscribe}
                style={
                {backgroundColor: `${Subscribed ? '#AAAAAA' : '#fcc8ae'}`, 
                borderRadius: '4px', 
                color: 'white', 
                padding: '10px 16px 30px 16px', 
                fontWeight: '500', 
                textTransform: 'uppercase'}}>
                {Subscribed? 'Subscribed' : 'Subscribe'}
            </Button>
            <p>{SubscribeNumber} Subscribers</p>
        </div>
    )
}

export default Subscriber
