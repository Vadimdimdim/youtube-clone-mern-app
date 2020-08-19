import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { uploadVideo, uploadFiles, thumbnail } from "../../../actions/video_actions";

import { VideoCameraAddOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' },
]

const Category = [
    { value: 0, label: 'Film' },
    { value: 0, label: 'Animation' },
    { value: 0, label: 'Auto' },
    { value: 0, label: 'Music' },
    { value: 0, label: 'Pets and Animals' },
    { value: 0, label: 'Sports' },
]

function VideoUpload(props) {
    const dispatch = useDispatch()
    //goes into variables
    const user = useSelector(state => state.user);

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0);
    const [Categories, setCategories] = useState("Film");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value);
    }

    const handleChangeDescription = (event) => {
        console.log(event.currentTarget.value);
        setDescription(event.currentTarget.value);
    }

    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value);
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value);
    }

    const onSubmit = (event) => {

        event.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (title === "" || Description === "" ||
            Categories === "" || FilePath === "" ||
            Duration === "" || Thumbnail === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            author: user.userData._id,
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        }

        dispatch(uploadVideo(variables))
            .then(response => {
                if (response.payload.success) {
                    alert('Video Uploaded Successfully')
                    props.history.push('/')
                } else {
                    alert('You are not allowed to do that. Please LogIn stupid')
                }
            })
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0]);

        dispatch(uploadFiles(formData, config))
            .then(response => {
                if (response.payload.success) {
                    let variables = {
                        filePath: response.payload.filePath,
                        fileName: response.payload.fileName
                    }
                    setFilePath(response.payload.filePath)
                    dispatch(thumbnail(variables))
                        .then(response => {
                            if (response.payload.success) {
                                setDuration(response.payload.fileDuration);
                                setThumbnail(response.payload.thumbsFilePath);
                                console.log(response.payload.thumbsFilePath);
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })
                } else {
                    alert("failed to save the video");
                }
            })
    }

    return (
        <div style={{ width: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <VideoCameraAddOutlined style={{ fontSize: '5rem', marginLeft: '115px' }} />
                            </div>
                        )}
                    </Dropzone>

                    {Thumbnail !== "" &&
                        <div>
                            <img src={"http://localhost:5000/" + Thumbnail} alt="meh" />
                        </div>
                    }
                </div>

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title}
                />

                <br /><br />

                <label>description</label>
                <TextArea
                    onChange={handleChangeDescription}
                    value={Description}
                />
                <br /><br />

                <select onChange={handleChangeOne}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <select onChange={handleChangeTwo}>
                    {Category.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUpload