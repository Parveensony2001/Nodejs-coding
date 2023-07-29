const Comment = require("../models/comment");
const Post = require("../models/post");
// const commentsMailer = require("../mailers/comments_mailer");
const queue = require("../config/middleware");
// const commentEmailWorker = require("../workers/comment_email_worker");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  // Post.findById(req.body.post)
  // .then((post)=>{
  //         if(post){
  //             Comment.create({
  //                 content: req.body.content,
  //                 post: req.body.post,
  //                 user: req.user._id
  //             })
  //             .then((comment)=>{
  //                 post.comments.push(comment);
  //                 post.save();
  //                 return res.redirect('/');
  //             })
  //             .catch((err)=>{
  //                 res.redirect('/');
  //             })
  //         }
  // });

  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });
      post.comments.push(comment);
      post.save();

      comment = await comment.populate("user", "name email");
      // commentsMailer.newComment(comment);  // if you use this then as soon as user makes comment , an email is delievered to him without any delay , flow of making comment :- commentMailer.newComment ->  nodeMailer.transporter.sendMail()
      let job = queue.create("emails", comment).save(function (err) {
        if (err) {
          console.log("Error in sending to the queue");
          return;
        }
        console.log("job enqueued", job.id); // here comment is made immediately & comment_email_mailer sends the id of corres. job as soon as comment is made but email gets delayed(make multiple comment faster & check)
      }); // form of making comment is comment_email_worker -> commentMailer.newComment ->  nodeMailer.transporter.sendMail()
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.destroy = async function (req, res) {
  // Comment.findById(req.params.id)
  // .then((comment)=>{
  //     if(comment.user == req.user.id){
  //         // console.log(req.user.id , comment.user);
  //         let postId = comment.post;
  //         comment.deleteOne();
  //         Post.findByIdAndUpdate(postId , {$pull : {comments : req.params.id}})
  //         .then((post)=>{
  //             return res.redirect('back');
  //         })
  //     }
  //     else{
  //         return res.redirect('back');
  //     }
  // });

  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.deleteOne();
      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      // CHANGE :: destroy the associated likes for this comment
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });
    }
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
  }
};
