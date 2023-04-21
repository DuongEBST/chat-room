import React from 'react'
import "./style.css"
import { chatRooms } from '../../data/chatRoom'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
        <h2 style={{textAlign: "center", margin: "10px"}}>Choose a Chat Room</h2>
        <ul className="chat-room-list">
            {chatRooms.map(room => (
                <li key={room.id}>
                    <Link to={`/room/${room.id}`}>{room.title}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Landing