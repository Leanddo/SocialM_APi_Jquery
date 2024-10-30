$(document).ready(function() {
    $("#postForm").on("submit", async function(e) {
        e.preventDefault();

        const text_content = $("#message-text").val();
        console.log(text_content);

        const checkBox = $("#private").is(":checked");        
         
        try {
            console.log("Sending request...");
            const response = await $.ajax({
                url: `http://localhost:3000/api/posts`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({content: text_content, private: checkBox}),
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

            $("#private").prop('checked', false); 

            // Reload the page to reflect the newly added comment
            window.location.reload();
        } catch (error) {
            $("#errorElement").text("Error connecting to the server"); // Make sure to have an element with this ID
            console.error("Error:", error);
        }
    });

});
