import lib from 'mongoose/lib';
import React from 'react';
import ReactEmoji from 'react-emoji';
import {format} from 'timeago.js';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import download from 'downloadjs';

import './Message.css';

const Message = ({ message, own, user, sender}) => {

const [friend, setFriend] = useState("");

const messageRef = useRef();

useEffect(() => {
  if (messageRef.current) {
    messageRef.current.scrollIntoView(
      {
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
  }
})



useEffect(()=>{
    
        let friendId = sender;
        const getUser = async() => {
            try{
            const res = await axios("http://localhost:5000/api/v1/friends/users?userId=" + friendId);
            setFriend(res.data);
            }catch(err)
            {
                console.log(err);
            }
        }
        getUser();
    },[user, sender]);

if(own == true)
 {
     return (<li className="msg-left" ref={messageRef}>
     <div className="msg-left-sub">
         <img src="https://nicesnippets.com/demo/man03.png" alt="user_ico"/>
         <p>{user.username}</p>
         <div className="msg-desc">
             {ReactEmoji.emojify(message.text)}
             {message.filePath !== "" && message.filePath?.length > 0 && <p>
             <button
                type="button"
                onClick={async () => {
                    const res = await fetch(`http://localhost:5000/api/v1/messages/download?filePath=${message.filePath}`);
                    console.log(res);
                    const blob = await res.blob();
                    download(blob);
                }}
            >
                    Download File
            </button>
        </p>}
         </div>
         <small>{format(message.createdAt)}</small>
     </div>
 </li>);
 }
 else
 {
    return(
        <>
            <li className="msg-right" ref={messageRef}>
                <div className="msg-left-sub">
                    <img src="https://nicesnippets.com/demo/man04.png" alt="user_ico"/>
                    <p>{friend.username}</p>
                    <div className="msg-desc">
                        {ReactEmoji.emojify(message.text)}
                        {message.filePath !== "" && message.filePath?.length > 0 && <p>
                        <button
                            type="button"
                            onClick={async () => {
                                const res = await fetch(`http://localhost:5000/api/v1/messages/download?filePath=${message.filePath}`);
                                const blob = await res.blob();
                                download(blob);
                            }}
                        >
                                Download File
                        </button>
                    </p>}
                    </div>
                    <small>{format(message.createdAt)}</small>
                </div>
            </li>
        </>)
 }
}

export default Message;


