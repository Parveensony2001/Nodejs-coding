{
    // method to submit the form data for new post using AJAX
    let createPost = function () {
      let newPostForm = $("#new-post-form");
  
      newPostForm.submit(function (e) {
        e.preventDefault();
  
        $.ajax({
          type: "post",
          url: "/posts/create",
          data: newPostForm.serialize(),
          success: function (data) {
            // console.log('Data' , data); // not printing
            let newPost = newPostDom(data.data.post);
            $("#posts-list-container>ul").prepend(newPost);
            deletePost($(" .delete-post-button", newPost));
  
            // call the create comment class
            // new PostComments(data.data.post._id);
  
            // CHANGE :: enable the functionality of the toggle like button on the new post
            new ToggleLike($(" .toggle-like-button", newPost));
          },
          error: function (error) {
            console.log(error.responseText);
          },
        });
      });
    };
  
    // method to create a post in DOM
    // here we are receiving the data from postController.create & displaying it in jquery
    let newPostDom = function (post) {
      return $(`<li id="post-${post._id}">
                      <p>
                          
                          <small>
                              <a class="delete-post-button"  href="/posts/destroy/${post._id}">delete</a>
                          </small>
  
                          ${post.content}
                          <br>
                          <small>
                          ${post.user.name}
                          </small>
                          <small>
                              
                              <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                  0 Likes
                              </a>
                      
                          </small>
                      </p>
                      <div class="post-comments">
                          
                              <form action="/comments/create" method="POST">
                                  <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                  <input type="hidden" name="post" value="${post._id}" >
                                  <input type="submit" value="Add Comment">
                              </form>
                 
                  
                          <div class="post-comments-list">
                              <ul id="post-comments-${post._id}">
                                  
                              </ul>
                          </div>
                      </div>
                      
                  </li>`);
    };
  
    // method to delete a post from DOM
    let deletePost = function (deleteLink) {
      $(deleteLink).click(function (e) {
        e.preventDefault();
  
        $.ajax({
          type: "get",
          url: $(deleteLink).prop("href"),
          success: function (data) {
            console.log(`#post-${data.data.post_id}`);
            console.log($(`#post-${data.data.post_id}`));
            console.log($(`#post-${data.data.post_id}`).remove());
            console.log(data);
            // console.log($(`#post-${data.data.post_id}`));
          },
          error: function (error) {
            console.log(error.responseText);
          },
        });
      });
    };
    console.log("1");
    createPost();
  }
  