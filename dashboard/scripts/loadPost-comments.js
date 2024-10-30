$(document).ready(function() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    console.log(id);

    fetchAllPosts(id);
    fetchComments(id);
});

function fetchAllPosts(id) {
    $.ajax({
        url: `http://localhost:3000/api/posts/${id}`,
        method: 'GET',
        success: function(postsData) {
            console.log(postsData);
            createPostCard(postsData); // Create a card for the post
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching the post:', textStatus, errorThrown);
        }
    });
}

function createPostCard(post) {
    // Clone the template
    const template = $('#post-card-template').clone();
    template.css('display', 'block');
    template.removeAttr('id');

    // Populate the card fields
    template.find('.username').text(post.user.username);
    template.find('.content').text(post.content);
    template.find('.link').attr('href', `post.html?id=${post.post_id}`);
    template.find('.created-at').text(new Date(post.created_at).toLocaleString());

    // Append to the post container
    $('#post-container').append(template);
}

function fetchComments(id) {
    $.ajax({
        url: `http://localhost:3000/api/comments/${id}`,
        method: 'GET',
        success: function(commentData) {
            console.log(commentData);
            commentData.forEach(comment => createCommentCard(comment)); // Create a card for each comment
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching the comments:', textStatus, errorThrown);
        }
    });
}

function createCommentCard(comment) {
    // Clone the template
    const template = $('#list-card-template').clone();
    template.css('display', 'block');
    template.removeAttr('id');

    // Populate the card fields
    template.find('.username').text(comment.user.username);
    template.find('.text-content').text(comment.comment_text);
    template.find(".deleteButton").attr('value', comment.comment_id);
    template.find('.created-at').text(new Date(comment.created_at).toLocaleString());

    // Append to the list group
    $('#list-group').append(template);
}
