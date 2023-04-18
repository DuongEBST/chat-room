import React, { useLayoutEffect, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import useMessages from '../../hooks/useMessages'
import "./style.css"

const MessageList = ({roomId}) => {
    const containerRef = useRef(null)
    // const {user} = useAuth()
    const user = JSON.parse(sessionStorage.getItem("user"))
    const messages = useMessages(roomId)

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
                    />
                ))}
            </div>
        </div>
    )
}

const Message = ({message, isOwnMessage, avartar}) => {
    const {text, img} = message
    return (
        // <div className={['message', isOwnMessage && 'own-message'].join(' ')}>
        //     <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
        //     <p>{text}</p>     
        //     <div style={{width: "50%", display: "inline-block"}}>
        //         {img && <img src={img} alt="" className='img-message'/>} 
        //     </div>        
        // </div>
        <div className={`message-container ${isOwnMessage && "own"}`}>        
            <img src={avartar} className='avatar'/>
            <div className='message-content'>
                {text &&
                    <div className="message-text">
                        {text}
                    </div>
                }    
                {img && 
                    <div className='message-img'>
                        <img src={img} alt="" width="50%"/>
                    </div>
                }
            </div>
        </div>
    )
}

export default MessageList