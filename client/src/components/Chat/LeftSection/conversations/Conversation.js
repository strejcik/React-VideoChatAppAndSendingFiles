import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';


export default function Conversation({ conversation, currentUser, onlineUsers }){
    const [user, setUser] = useState("");
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(()=>{
        const friendId = conversation.members.find(m=> m !== currentUser._id);
        const getUser = async() => {
           try{
            const res = await axios("http://localhost:5000/api/v1/friends/users?userId=" + friendId);
            setUser(res.data);
           }catch(err)
           {
               console.log(err);
           }
        }
        getUser();
    },[currentUser, conversation]);

return (
    <>
    {
        <li>
        <div className="chatList">
            <div className="img">
                <img src="https://nicesnippets.com/demo/man04.png" alt="user_ico"/>
            </div>
            <div className="desc">
               <small className="time">4 day</small>
                <h5>{user.username}</h5>
                <small>Lorem ipsum dolor sit amet...</small>
           </div>
        </div>
    </li>
    }
    </>);

}