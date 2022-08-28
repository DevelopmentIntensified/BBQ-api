// Required Modules
const express = require('express');

const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const fs = require('fs');

const routeFiles = fs.readdirSync('./routes/routes').filter((file) => file.endsWith('.js'));

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  const ref = req.headers;
  // console.log(ref)
  next();
});

var whitelist = ['talkALot.koalaknightmi.repl.co', process.env.ip, process.env.ip2, 'http://localhost:3000'];
const corsOptions = {
  origin: whitelist,
};

app.use(cors(corsOptions));
// app.use(cors({ origin: 'localhost' , credentials :  true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

for (let file of routeFiles) {
  file = file.split('.')[0];
  const route = require(`./routes/routes/${file}`);
  app.use(`/${file}`, route);
}
app.use('/', require('./routes/index'));

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: whitelist,
    credentials: true,
  },
});
const sockets = require('./sockets');
io.use((socket, next) => {
  next();
});
io.on('connection', sockets);

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
