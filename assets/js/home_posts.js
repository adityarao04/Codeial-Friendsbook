{
    // method to submit form data for new post using AJAX
    let createpost = function() {

        let newPostFrom = $('#new-post-form');

        newPostFrom.submit(function(e) {
            e.preventDefault();


            $.ajax({
                type: 'POST',
                url: '/posts/create',
                data: newPostFrom.serialize(),
                success: function(data) {
                    let newPost = newPostDom(data.data.post);
                    console.log("newPost", newPost);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button', newPost));
                },
                error: function(error) {
                    console.log(error.reponseText);
                }
            })
        })
    }


    // method to create a post in DOM
    // let newPostDom = function(post) {
    //     return $(`<li id='post-${post._id}'>
    //     <p>



    //             <small>
    //         <a class='delete-post-button' href="/posts/destroy/${post._id}">X</a>
    //          </small>

    //          ${post.content}
    //                     <br>
    //                     <small>
    //                     ${post.user.name}
    //         </small>
    //                     <small>

    //       </small>
    //     </p>
    //     <div class="post-comments">

    //             <form action="/comments/create" method="POST" id="comments-form">
    //                 <input type="text" name="content" autocomplete="off" placeholder="Type Here to add comment..." required>
    //                 <input type="hidden" autocomplete="off" name="post" value="${post._id}">
    //                 <input type="submit" value="Add Comment">
    //             </form>




    //                 <div class="post-comments-list">
    //                     <ul id="post-comments-${post._id}">


    //                     </ul>
    //                 </div>
    //     </div>
    // </li>`)
    // }

    let newPostDom = function(post) {
        return $(`<li id='post-${post._id}' class='post-container'>
        <div class='post-container__post'>
    
    
                <small>
            <a class='delete-post-button' href="/posts/destroy/${post.id}"><img src='https://cdn-icons-png.flaticon.com/512/0/39.png' alt="remove-post"></a>
             </small>
                    <div class="post-content-container">
                        ${post.content}
    
                    </div>
                    <div class="additional-info-container">
                        <small>
                             ${post.user.name}
                            </small>
    
                    </div>
                    <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
                        </small>
        </div>
        <div class="post-comments">
         
                <form id="post-${post._id}-comments-form" action="/comments/create" method="POST" class='comments-form'>
                    <input type="text" name="content" autocomplete="off" placeholder="Type Here to add comment..." required class='input-comment'>
                    <input type="hidden" autocomplete="off" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment" class="comment-submit">
                </form>
    
    
    
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}" style="list-style: none;">
    
                        </ul>
                    </div>
        </div>
    </li>`)
    }



    // method to delete a post from DOM
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e) {
            e,
            preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#post-${data.post_id}`).remove()
                },
                error: function(error) {
                    console.log(error.reponseText);
                }
            })
        })
    }

    createpost();
}