import React from 'react';
import OnlineUsers from './onlineusers/OnlineUsers';
import './online.css';

const OnlineSection= ({
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
    return <OnlineUsers
        //====Chat props start====//
        onlineUsers={onlineUsers}
        currentId={currentId}
        setCurrentChat={setCurrentChat}
        //====Chat props end====//
        
        //====Video props start====//
        setIdToCall={setIdToCall}
        idToCall={idToCall}
        callPeer={callPeer}
        //====Video props end====//
    />
}

export default OnlineSection;