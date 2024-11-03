<<<<<<< HEAD
const fs = require('fs');
const userManager = require('../users/usermanager');

const chat = {
  name: 'koala',
  users: [],
  messages: [],
};
=======
const fs = require("fs")
const userManager = require("../users/usermanager")
const eventFiles = fs.readdirSync('./sockets/events').filter(file => file.endsWith('.js'));
>>>>>>> 2d14b76 (push)


const connection = (socket) => {
<<<<<<< HEAD
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
=======
  console.log(userManager)
  userManager.newUser(socket.profile,socket.id,socket.uid)
  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    socket.on(file,event)
  };
  socket.on("disconect", (reason) => {
    console.log("user left" + socket.id)
    userManager.userLeft(socket.id)
  })
}
>>>>>>> 2d14b76 (push)

module.exports = connection;
