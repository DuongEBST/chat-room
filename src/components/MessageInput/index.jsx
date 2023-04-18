import React, { useEffect, useState } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from "uuid";
import { useAuth } from '../../hooks/useAuth'
import { sendMessage } from '../../services/firebase'
import './style.css';
import { IconButton } from '@mui/material';
import FileMessagePopup from '../FileMessagePopup';

const MessageInput = ({ roomId }) => {
    // const { user } = useAuth();
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [value, setValue] = useState('');
    const [image, setImage] = useState(null)
    const [imgsPreview, setImgsReview] = useState([])

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeImg = (e) => {
        if(e){
            setImage(e.target.files[0])
            setImgsReview([...imgsPreview, {id: uuid(), img: URL.createObjectURL(e.target.files[0])}])
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(roomId, user, value, image);
        setValue('');
        setImage(null)
        setImgsReview([])
    };

    const deletePreviewImg = (img) => {
        let newImgsPreview = imgsPreview.filter(item => item.id !== img.id)

        setImgsReview(newImgsPreview)
    }

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            {imgsPreview.length > 0 && <FileMessagePopup imgs={imgsPreview} deleteImg={deletePreviewImg}/>}
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                onChange={handleChange}
                className="message-input"
                required
                minLength={0}
            />
            <IconButton color="primary" aria-label="upload picture" component="label" onChange={handleChangeImg}>
                <input hidden accept="image/*" type="file" />
                <PhotoCameraIcon />
            </IconButton>

            <IconButton color="primary" type="submit" > {/*disabled={value < 1 || !image}*/}
                <input hidden accept="image/*" type="file" />
                <SendIcon />
            </IconButton>
            
            {/* <button type="submit" disabled={value < 1} className="send-message">
                Send
            </button> */}
        </form>
    )
}

export default MessageInput