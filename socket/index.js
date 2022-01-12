const events = require('events');
const eventEmitter = new events.EventEmitter();
const User = require('../models/user.model.js');

module.exports = function(socket) {

let users = [];



const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
    !users.some(user => user.socketId === socketId) &&
    users.push({userId, socketId});
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

const getU = (socketId) => {
    return users.find(user => user.socketId === socketId);
}





socket.on("connection", (socket) => {
    console.log('user connected.');
    
    
    socket.on("addUser", userId=>{
        addUser(userId, socket.id);
        socket.emit("getUsers", users);
    });

    socket.on('getMe', (u) => {
        socket.emit("me", getUser(u)["socketId"]);
    });

    
    socket.on("refreshOnlineUsers", () => {
        socket.emit("getUsers", users);
    });
    




    socket.on('callUser', (data)=>{
        socket.to(getU(data.userToCall)?.["socketId"]).emit('hey', {signal: data.signalData, from: data.from})
    })

    socket.on('acceptCall', (data)=>{
        socket.to(getU(data.to)["socketId"]).emit('callAccepted', data.signal)
    })

    socket.on('close', (data)=>{
        socket.to(getU(data.to)?.["socketId"]).emit('close');
    })

    socket.on('rejected', (data)=>{
        socket.to(getU(data.to)["socketId"]).emit('rejected')
    })

    
    
    


    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text, filePath}) => {
        const user = getUser(receiverId);
        

        socket.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
            filePath
        })
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id);
        socket.emit("getUsers", users);
        socket.broadcast.emit("callEnded");
    });


})
}












