const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req , res){
    // return res.end("<h1>Users Profile</h1>");

    // return res.render("user_profile" , {
    //     title : "Users"
    // })

    User.findById(req.params.id)
    .then((user)=>{
        return res.render("user_profile" , {
            title : "User Profile",
            profile_user : user
        })
    })

}



module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body)
    //     .then((user)=>{
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){ // multer processes the request on calling this function 
                if(err){console.log('*****Multer Error' , err);}
                //console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;   // upadted the user
                if(req.file){
                    
                    if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    } 
                    
                    user.avatar =  User.avatarPath + '/' + req.file.filename;
                } // upadted the user avatar
                user.save(); 
                return res.redirect('back');
            })

        } catch (error) {
            req.flash('error' , error);
            return res.redirect('back');
        }
    }else{
        return res.status(401).send('Unauthorized');
    }
}



// for localhost/user/sign-up  , this action is taken (to display/render sign up page)
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up' , {
        title : 'Codeial | Sign Up'
    })
}


// for localhost/user/sign-in  , this action is taken (to display sign in page)
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in' , {
        title : 'Codeial | Sign In'
    })
}   




// action to handle post request made by user by filling the form in user_sign_up page :->
module.exports.create = function(req, res){
    // console.log(req.body.password , req.body.confirm_password);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');  // back to sign up page
    }

    User.findOne({email : req.body.email})
    .then((user)=>{  
        if(!user){    
            User.create(req.body)
            .then((user)=>{
                // console.log(`${new_user} is added in User collection`); 
                return res.redirect('/users/sign-in');  // if you redirect to sign-in page i.e user is created in database
            })
            .catch((err)=>{
                console.log('Error in creating the user while signing up');
                return ;
            })
        } else{   // if user with given email already exist then redirect back to sign up page
            return res.redirect('back');
        }
    })
    .catch((err)=>{
        console.log('Error in finding the user while signing up');
        return;
    })

};



// action to handle post request made by user by filling the form in user_sign_in page  :->
module.exports.createSession = function(req, res){
    req.flash('success' , "Logged In Successfully");
    // console.log('a1' ,  "Logged In Successfully");
    return res.redirect('/');  
};


module.exports.destroySession = function(req , res){
    
    req.logout(function(err) {  // req.logout() is now an asynchronous function, whereas previously it was synchronous
        if (err) { return next(err); }
        req.flash('success' , "You have logged out !");
        // console.log('a2' ,   "You have logged out !");
        return res.redirect('/');
      });


}



