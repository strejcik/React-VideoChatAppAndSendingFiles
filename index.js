require('dotenv-extended').load('.env');
require('./config/passport');
let express = require('express');
let fs = require('fs');
let app = express();
let http = require('http');
let server = http.createServer(app);
let socketio = require('socket.io');
let socket = socketio(server, {cors: {
  origin: "http://localhost:5000",
  methods: [ "GET", "POST" ]
   // or "*"
  }});
require('./socket')(socket);
let session = require('express-session');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let path = require('path');
let cors = require('cors');
let MongoStore = require('connect-mongo')(session);
const fileupload = require("express-fileupload");






//Routes
const userRoutes = require('./routes/user.routes');
const conversationsRoute = require("./routes/conversations.routes");
const messageRoute = require("./routes/messages.routes");
const uRoute = require("./routes/uroute.routes");


//Database
// mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE, {
//     user: process.env.MONGO_USER,
//     pass: process.env.MONGO_PASS,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useNewUrlParser: true
// });

mongoose.connect('mongodb://127.0.0.1:27017/n', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useNewUrlParser: true
});

const connection = mongoose.connection;
connection.on('error', (err) => {
	console.error.bind(console, 'connection error:');
})
connection.once('open',() => {
	console.log('Connected to MongoDB database.');
});

//Middleware
let whitelist = ['http://localhost:3000/'];
let corsOptions = {
  origin: whitelist,
  allowedHeaders:['X-Requested-With', 'Content-Type'],
  credentials: true,
  methods: 'GET,POST,DELETE,PUT,PATCH',
}
app.use(cors());
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static("files"));
app.use(session({
  secret: 'secret session key',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  unset: 'destroy',
  name: 'session cookie name'
}));


//Server API
app.use('/api/v1/', userRoutes);
app.use("/api/v1/conversations", conversationsRoute);
app.use('/api/v1/messages', messageRoute);
app.use('/api/v1/friends', uRoute);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})





//Server configuration
const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> console.log('Server running at port: ', PORT));



