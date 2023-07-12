// // import libarary of node.js
// const express = require('express'); // express server
// const path = require('path'); //all file path
// //form a app
// const app = express();  // let app = http.createserver();   create server
// const mongoose = require('./config/mongoose');
// const schema = require('./schima/stchima');

// app.set('view engine', 'ejs');                                          
// app.set('views', path.join(__dirname, 'views'));//attch html ejs file and give path
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('./assets'))             // static file like css

// var contactList = [
//     {
//         name: "praveen soni",
//         phone: "9982699530"
//     },
//     {
//         name: "ram",
//         phone: "0000000000"
//     },
//     {
//         name: "krishna ",
//         phone: "00000000000"
//     }
// ]
// //form a starting pase 
// app.get('/ram', function(req, res){
//     schema.find({} , function(err,contact){
//         if(err){
//             console.log("this function show's error")
//             return;
//         }
//         return res.render('home',{
//             title: "Contact List",
//             contact_list: contacts
//         });
//     })
// });
// app.post("/create-contact",function(req,res){

//     schema.create({
//         name:req.body.name,
//         phone:req.body.phone,
//     },function(err,newContect){
//         if(err){
//             console.log("this function show's error")
//             return; 
//         }
//         console.log("*******",newContect);
//         return res.redirect('back');
//     })
// })
//     // app.post("/create-contact",function(req,res){     //"/create-contact" is most importent
//     // //     // return res.redirect('practice');
//     // //     // contactList.push({
//     // //     //     name :req.body.name,
//     // //     //     phone :req.body.phone
//     // //     // })
//     // //     // return res.redirect("/ram");
//     // //     contactList.push(req.body);             //push in object.
//     // // return res.redirect('/ram');                //and after push need rediret choice page
//     // contect.
//     // });

// app.listen(8000, function(err){
//     if (err) {
//         console.log("Error in running the server", err);
//     }
//     console.log('Yup!My Server is running on Port', 8000);
// })

//    app.get('/delete-contect/',function(req,res){
//      console.log(req.query);
//     let id = req.query.id;
//        schema.findIndex(id,function(req,res){
//         if (err) {
//             console.log("Error in running the server", err);
//             return;
//         }
//         return res.redirect('back')
//     });
// });
const express = require('express');
const app = express();
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./schima/stchima');
const { default: mongoose } = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

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

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/ram',async function(req, res){


  let contacts =  await Contact.find({})

        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })

app.post('/create-contact',async function(req, res){
    
 let newContect =  await  Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    return res.redirect('back')
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-contect', async function(req, res) {
    try {
      console.log(req.query);
      let id = req.query.id;
  
      await Contact.findOneAndDelete({ _id: id });
  
      return res.redirect('back');
    } catch (error) {
      console.error('Error in deleting the object:', error);
      return res.status(500).send('Internal Server Error');
    }
  }); 