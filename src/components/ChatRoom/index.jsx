import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { chatRooms } from '../../data/chatRoom'
import "./style.css"
import MessageInput from '../MessageInput'
import MessageList from '../MessageList'

const ChatRoom = () => {
  const params = useParams()
  const [editMessage, setEditMessage] = useState(null)

  const room = chatRooms.find(x => x.id === params.id)
  if(!room){

  }

  const getEditMessage = (message, isOwnMessage) => {
    if(isOwnMessage){
      setEditMessage(message)
    }
  }

  return (
    <div className='chat-room-container'>
      <div className='chat-room-header'>
        <h2>{room.title}</h2>
        <div>
          <Link to="/">⬅️ Back to all rooms</Link>
        </div>
      </div>
      <div className="messages-container">
        <MessageList 
          roomId={room.id}
          getEditMessage={getEditMessage}
        />
        <MessageInput 
          roomId={room.id} 
          editMessage={editMessage}
          setEditMessage={setEditMessage}
        />
      </div>
    </div>
  )
}

export default ChatRoom