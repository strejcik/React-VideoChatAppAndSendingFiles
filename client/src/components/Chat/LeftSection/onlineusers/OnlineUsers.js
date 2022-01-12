import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'



const OnlineUsers = ({
    onlineUsers,
    currentId,
    setCurrentChat
}) => {
const [onlineFriends, setOnlineFriends] = useState([]);
const [friends, setFriends] = useState([]);

  useEffect(() => {
      const getFriends = async () => {
          const res = await axios.get('http://localhost:5000/api/v1/users/friends/'+currentId);
          
          setFriends(res.data);
      }
      getFriends();
  },[currentId]);

  const handleClick = async(e) => {
    console.log(e);
    try{
        const res = await axios.get(`http://localhost:5000/api/v1/conversations/find/${currentId}/${e._id}`);
        setCurrentChat(res.data);
    }catch(err)
    {
        console.log(err);
    }
  }

  useEffect(() => {
    setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
}, [friends, onlineUsers]);

  return (
    <div>
        {onlineFriends.map((e,k) => (<li className="active" key={k} onClick={() => handleClick(e)}>
              <div className="chatList">
                  <div className="img">
                      <i className="fa fa-circle"></i>
                      <img src="https://nicesnippets.com/demo/man03.png" alt="user_ico"/>
                  </div>
                  <div className="desc">
                      <small className="time">4 day</small>
                      <h5>{e?.username}</h5>
                      <small>Lorem ipsum dolor sit amet...</small>
                  </div>
              </div>
          </li>))}
    </div>
  )
}


export default OnlineUsers;
