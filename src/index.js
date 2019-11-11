const express = require('express');
const engine= require('ejs-mate');
const exphbs= require('express-handlebars');
const path = require('path');
const socketIO= require('socket.io');
const http = require('http');

const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');





//iniciando server
const app=express();
const server= http.createServer(app);
const io=socketIO(server);
require('./database');
require('./config/passport');

var PORT = process.env.PORT || 5000;



//settings
//app.engine('ejs',engine);
//app.set('view engine', 'ejs');

app.set('views',path.join(__dirname ,'views'));

//app.engine('ejs',engine);
//app.set('view engine', 'ejs');

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
  }));
  app.set('view engine', '.hbs');

//midleware

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//routes
app.use(require('./routes'));

app.use(require('./routes/users'));
app.use(require('./routes/mapas'));

//sockets
require('./socket')(io);
//static files
app.use(express.static(path.join(__dirname,'public')));




server.listen(PORT,() =>{
    console.log('Server on port 3000');
});