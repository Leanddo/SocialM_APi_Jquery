$(document).ready(function() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    $("#commentForm").on("submit", async function(e) {
        e.preventDefault();

        const text_content = $("#message-text").val();
        console.log(text_content);

         
        try {
            console.log("Sending request...");
            const response = await $.ajax({
                url: `http://localhost:3000/api/comments/${id}`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ "comment_text": text_content }),
                xhrFields: {
                    withCredentials: true 
                },
                crossDomain: true
            });

            console.log(response); // Log the response

            // Optionally provide feedback to the user
            $("#successElement").text("Comment submitted successfully!"); // Ensure you have an element with this ID

            // Clear the input field after submission
            $("#message-text").val("");

            // Reload the page to reflect the newly added comment
            window.location.reload();
        } catch (error) {
            $("#errorElement").text("Error connecting to the server"); // Make sure to have an element with this ID
            console.error("Error:", error);
        }
    });

});
