 // Required Modules
const express = require('express');
const app = express()
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require("cors")

const fs = require("fs")
const routeFiles = fs.readdirSync('./routes/routes').filter(file => file.endsWith('.js'));
const sockets = require("./sockets")

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next)=>{
  var ref = req.headers;
  //console.log(ref)
  next()
})

var whitelist = ["https://bbq-api.koalaknightmi.repl.co",process.env.ip,process.env.ip2,'http://localhost:3000', 'https://bible-quizzing-online.koalaknightmi.repl.co']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
//app.use(cors({ origin: 'localhost' , credentials :  true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

for (let file of routeFiles) {
  file = file.split(".")[0]
	const route = require(`./routes/routes/${file}`);
  app.use(`/${file}`, route);
};
app.use("/",require(`./routes/index`))

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: whitelist,
    credentials: true
  }
});

io.use((socket, next) => {
  console.log(socket.handshake.auth)
  const uid = socket.handshake.auth.uid;
  const profile = socket.handshake.auth.profile;
  if (!uid) {
    return next(new Error("invalid uid"));
  }
  socket.uid = uid;
  socket.profile = profile;
  next();
});
io.on('connection', sockets);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});