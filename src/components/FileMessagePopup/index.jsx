import React from 'react'
import "./styles.css"
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material'

const FileMessagePopup = ({filesPreview, deleteImg}) => {
  return (
    <div className='message-popup-container'>
        <div className='message-popup-contain'>
            {filesPreview?.length > 0 && filesPreview.map(item => (
                <div className='img-box' key={item?.id}>
                    {item?.type.includes('image') && <img src={item?.previewUrl} className='img-content'/>}
                    {item?.type.includes('video') &&
                        <video controls className='img-content'>
                            <source src={item.previewUrl}/>
                        </video>
                    }
                    <div className='delete-img'>
                        <IconButton aria-label="delete" size="small" onClick={(e) => deleteImg(item)} className='delete-btn'>
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