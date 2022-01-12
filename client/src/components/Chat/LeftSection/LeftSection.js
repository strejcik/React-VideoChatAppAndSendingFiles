import React from 'react'
import './LeftSection.css';
import Conversation from "./conversations/Conversation.js";
import OnlineUsers from './onlineusers/OnlineUsers.js'

const LeftSection = 
({ 
    conversations,
    user,
    setCurrentChat,
    onlineUsers,
    currentId
}) => {
  return (
    <React.Fragment>
    <div className="left-section">
        <ul>
            {conversations.map((c, k) => (
              <div onClick={()=>setCurrentChat(c)} key={k}>
                  <Conversation conversation={c} currentUser={user} onlineUsers={onlineUsers} currentId={user._id}/>
              </div>
            ))}
        </ul>
	</div>
  </React.Fragment>
  )
}

export default LeftSection

