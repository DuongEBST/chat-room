import React, { useEffect, useState } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
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
    const [files, setFiles] = useState([])

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeFile = (e) => {
        if(e){
            let newFiles = files.length > 0 ? [...files] : []
        
            for(let file of e.target.files){
                newFiles.push({
                    id: uuid(),
                    file: file,
                    type: file.type,
                    previewUrl: URL.createObjectURL(file),
                })

            }
            
            setFiles(newFiles)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(roomId, user, value, files);
        setValue('');
        setFiles([])
    };

    const deletePreviewFile = (file) => {
        let newFiles = files.filter(item => item.id !== file.id)

        setFiles(newFiles)
    }

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            {files.length >  0 && <FileMessagePopup filesPreview={files} deleteImg={deletePreviewFile}/>}
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                onChange={handleChange}
                className="message-input"
            />
            <div >
                <IconButton color="primary" aria-label="upload picture" className='btn' component="label" onChange={handleChangeFile}>
                    <input hidden accept="image/*" type="file" multiple/>
                    <CameraAltIcon />
                </IconButton>

                <IconButton color="primary" aria-label="upload picture" className='btn' component="label" onChange={handleChangeFile}>
                    <input hidden accept="video/*" type="file" multiple/>
                    <OndemandVideoIcon fontSize='medium'/>
                </IconButton>

                <IconButton 
                    color="primary" 
                    type="submit" 
                    className='btn' 
                    component="label" 
                    disabled={!value && files.length === 0}
                    onClick={handleSubmit}
                >
                    <SendIcon />
                </IconButton>
            </div>
            
            {/* <button type="submit" disabled={value < 1} className="send-message">
                Send
            </button> */}
        </form>
    )
}

export default MessageInput