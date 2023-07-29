const express = require('express');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const cookieParser = require('cookie-parser');
const {route} = require('./routes');
const expressLayouts = require("express-ejs-layouts");
const app = express();
const Mongostore = require('connect-mongo')(session);
// for url fatch
app.use(express.urlencoded({extended: true}));
// for all cookies fatch and store
app.use(cookieParser());
//for fatch all static files from assets
app.use(express.static("./assets"));
app.set('view engine','ejs');
app.set('views','./views');
//make path upload to browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);
//extract the styles from subpages(ejs files) & put them into layout.ejs at specified locationseet
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(
    session({
    name: "inoutproject",
        //TODO: update this secrete key at the time of deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },

    store: new Mongostore(
      {
        mongooseConnection : db,
        // mongoUrl: "mongodb://localhost:27017/db_name",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//midallware use 
app.use(flash());
app.use(customMware.setFlash);

//for route
app.use('/',require('./routes'));

app.listen(2101,(err)=>{
    if(err)console.log(`ERROR :- ${err}`);

    console.log(`SUCSSES IS RUNNING ON PORT : 2101`);
})