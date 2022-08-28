const fs = require('fs');
const userManager = require('../users/usermanager');

const chat = {
  name: 'koala',
  users: [],
  messages: [],
};

const connection = (socket) => {
  socket.on('userInit', (data) => {
    userManager.newUser(data.profile, socket.id, data.uid);
    socket.emit('authed');
  });
  socket.on('userChatData',(data)=>{
    
  })
  socket.on('disconnect', (reason) => {
    console.log(`user left${socket.id}${reason}`);
    userManager.userLeft(socket.id);
  });
  socket.on('test', () => console.log('Test'));
  socket.on('message', (data) => {
    chat.messages.push(
      {
        user: userManager.getUser(socket.id).username,
        text: data,
      },
    );
  });
  setInterval(() => {
    chat.users = userManager.getOnlineUsers();
    socket.emit('chatUpdate', chat);
  }, 5000);
};

module.exports = connection;
