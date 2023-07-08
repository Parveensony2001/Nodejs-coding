const express = require('express');
const path = require('path');
const port = 8000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());


var contactList = [
    {
        name: "praveen soni",
        phone: "9982699530"
    },
    {
        name: "ram",
        phone: "0000000000"
    },
    {
        name: "krishna ",
        phone: "00000000000"
    }
]

app.get('/ram', function(req, res){
    return res.render('home',{
        title: "friends name",
        contact_list: contactList
    });
})
app.get('/practice',function(req,res){
    return res.render('practice',{
         tital: "jai shree ram"
    })
})
    app.post("/create-contact",function(req,res){     //"/create-contact" is most importent
        // return res.redirect('practice');
        // contactList.push({
        //     name :req.body.name,
        //     phone :req.body.phone
        // })
        // return res.redirect("/ram");
        contactList.push(req.body);
    return res.redirect('/ram');
    })

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})