import React from 'react'
import "./styles.css"
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material'

const FileMessagePopup = ({imgs, deleteImg}) => {
  return (
    <div className='message-popup-container'>
        <div className='message-popup-contain'>
            {imgs?.length > 0 && imgs.map(item => (
                <div className='img-box' key={item?.id}>
                    <img src={item?.img} className='img-content'/>
                    <div className='delete-img'>
                        <IconButton aria-label="delete" size="small" onClick={(e) => deleteImg(item)}>
                            <ClearIcon fontSize="inherit" color="error"/>
                        </IconButton>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FileMessagePopup