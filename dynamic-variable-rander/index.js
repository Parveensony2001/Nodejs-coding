let express = require("express");
let port =9000;
let path = require('path');

let app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/ram",(req,res)=>{
    return res.render("index",{name : "krishna"})
})
app.listen(port,(err)=>{
     if(err){console.log("server shows error");
     }
     console.log("server is working good",port);
}) 