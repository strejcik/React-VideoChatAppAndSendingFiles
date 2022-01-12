import React, {useRef, useEffect} from 'react'
import './Messages.css';
import Message from './../Message/Message';


const Messages = ({message, own, user, sender}) => {
    return(<div className="message">
        <ul className="messages">
            <Message message={message} own={own} user={user} sender={sender}/>
        </ul>
    </div>)
}

export default Messages
