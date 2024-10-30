$(document).ready(function() {
    $(document).on("click",".deleteButton", async function(e) {
        e.preventDefault();

        const id = $(this).val();

        if (!id) {
            console.error("No ID found for deletion.");
            $("#errorElement").text("Error: No post ID specified for deletion.");
            return;
        }
        
        try {
            console.log("Sending delete request...");

            const response = await $.ajax({
                url: `http://localhost:3000/api/posts/${id}`,
                method: 'DELETE',
                xhrFields: {
                    withCredentials: true 
                },
                crossDomain: true
            });

            console.log("Delete response:", response); 

            $("#successElement").text("Post deleted successfully!");

            window.location.reload();
        } catch (error) {
            $("#errorElement").text("Error connecting to the server. Could not delete the post."); 
            console.error("Delete error:", error); 
        }
    });
});
