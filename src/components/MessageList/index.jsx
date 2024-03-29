import React, { useLayoutEffect, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import useMessages from '../../hooks/useMessages'
import "./style.css"

const MessageList = ({roomId, getEditMessage}) => {
    const containerRef = useRef(null)
    // const {user} = useAuth()
    const user = JSON.parse(sessionStorage.getItem("user"))
    const messages = useMessages(roomId)
    console.log("messages ", messages)

    useLayoutEffect(() => {
        if(containerRef.current){
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    })

    return (
        <div className="message-list-container" ref={containerRef}>
            <div className="message-list">
                {messages.map(item => (
                    <Message 
                        key={item.id}
                        message={item}
                        isOwnMessage={item.uid === user.uid}
                        avartar={item.avartar}
                        getEditMessage={getEditMessage}
                    />
                ))}
            </div>
        </div>
    )
}

const Message = ({message, isOwnMessage, avartar, getEditMessage}) => {

    const viewFileDetail = (imgUrl) => {
        window.open(imgUrl, '_blank', 'noreferrer')
    }

    const {text, img, video, oldValues} = message
    
    return (
        <div className={`message-container ${isOwnMessage && "own"}`}>        
            <img src={avartar ? avartar : "/img/user.png"} className='avatar'/>
            <div className='message-content'>
                {text &&
                    <div className='message-text-container'>
                        {oldValues && <ModeEditIcon className={`pencil-icon ${!isOwnMessage && 'not-own'}`}/>}
                        <div className={`message-text ${isOwnMessage && 'edit'}`} onClick={(e) => getEditMessage(message, isOwnMessage)}>
                            {text}
                        </div>
                    </div>
                }    
                {img && 
                    <div className='message-item' onClick={(e) => viewFileDetail(img)}>
                        <img src={img} alt="" className='mes-img'/>
                    </div>
                }

                {video && 
                    <div className='message-item' onClick={(e) => viewFileDetail(video)}>
                        <video controls>
                            <source src={video}/>
                        </video>
                    </div>
                }
            </div>
        </div>
    )
}

export default MessageList