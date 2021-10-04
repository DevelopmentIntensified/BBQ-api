const fs = require("fs")
const eventFiles = fs.readdirSync('./sockets/events').filter(file => file.endsWith('.js'));

const connection = (socket) => {
  //console.log(socket)
  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    socket.on(file,event)
  };
}

module.exports = connection