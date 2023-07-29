// module.exports.home = function(req , res){
//     return res.render("home" , {
//         title:'Home'
//     })
// }

const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // Post.find({})
  // .populate('user')// to preloading  or prepopulating  multiple models
  // .populate({
  //     path : 'comments',
  //     populate :{  // to further polulate (can do as much nesting as want) , nested prepopulating
  //         path :'user'
  //     }
  // })
  // .exec()
  // .then((posts)=>{
  //     User.find({})
  //     .then((users)=>{
  //         return res.render('home' , {
  //             title : 'Codeial | Home',
  //             posts : posts,
  //             all_users :users,
  //         });
  //     })
  // });

  try {
    let posts = await Post.find({}).sort("-createAt").populate("user");
    // .populate({
    //     path : 'comments' ,
    //     populate : {
    //         path : 'user'
    //     },
    //     // populate : {
    //     //     path : 'likes'
    //     // }
    // })
    // .populate('likes');

    let users = await User.find({});
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};
