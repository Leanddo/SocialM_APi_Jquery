$(document).ready(function() {
    fetchAllPosts();
});

function fetchAllPosts() {
    $.ajax({
        url: 'http://localhost:3000/api/posts',
        method: 'GET',
        xhrFields: {
            withCredentials: true 
        },
        crossDomain: true,
        success: function(postsData) {
            console.log(postsData);
            postsData.forEach(post => createPostCard(post)); // Create a card for each post
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching the posts:', textStatus, errorThrown);
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
    template.find(".deleteButton").attr('value', post.post_id);
    template.find('.created-at').text(new Date(post.created_at).toLocaleString());

    // Append to the post container
    $('#post-container').append(template);
}
