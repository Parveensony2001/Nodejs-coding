const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const mongoose = require('mongoose');
app.set('view engine','ejs');
app.set('views',path.join(__dirname , 'views'));
const db = require('./config/mongoose');
const Contact = require('./schima/stchima');
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use('/',require('./router'))
  
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});