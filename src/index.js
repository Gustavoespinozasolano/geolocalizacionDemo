const express = require('express');
const engine= require('ejs-mate');
const path = require('path');
const socketIO= require('socket.io');
const http = require('http');
var PORT = process.env.PORT || 5000;

//iniciando server
const app=express();
const server= http.createServer(app);
const io=socketIO(server);

//settings
app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname ,'views'));
console.log(__dirname);

//routes
app.use(require('./routes/'));

//sockets
require('./socket')(io);
//static files
app.use(express.static(path.join(__dirname,'public')));




server.listen(PORT,() =>{
    console.log('Server on port 3000');
});