import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'



const OnlineUsers = ({
    //====Chat props start====//
    onlineUsers,
    currentId,
    setCurrentChat,
    //====Chat props end====//

    //====Video props start====//
    setIdToCall,
    idToCall,
    callPeer
    //====Video props end====//
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
    try{
        const res = await axios.get(`http://localhost:5000/api/v1/conversations/find/${currentId}/${e._id}`);
        setCurrentChat(res.data);
    }catch(err)
    {
        console.log(err);
    }
  }

  useEffect(() => {
    friends.map(e => onlineUsers.map(o => e.socketId = o.socketId ? e.socketId = o.socketId : null));
    setOnlineFriends(friends.filter(x => onlineUsers.some(y => y.userId === x._id)));
}, [friends, onlineUsers]);



  return (
    <div className={"onlineSection"}>
        <ul>
        {onlineFriends.map((e,k) => (<><li className="active" key={k} onClick={() =>{ handleClick(e); setIdToCall(e.socketId);}}>
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
             </li>
             {idToCall !== undefined && idToCall !== "" && idToCall!== null && <button onClick={() =>{callPeer(idToCall)}} key={k+1}>
                <i className="fa fa-video-camera" />
              </button>}
          </>
          ))}
        </ul>
    </div>
  )
}


export default OnlineUsers;
