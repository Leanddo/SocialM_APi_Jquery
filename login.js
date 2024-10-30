$(document).ready(function () {
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const errorElement = $("#error");
        errorElement.text("");

        const password = $("#password").val();
        const email = $("#email").val();

        console.log("Email:", email, "Password:", password);

        console.log("Sending request...");
        $.ajax({
            url: 'http://localhost:3000/api/user/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            xhrFields: {
                withCredentials: true
             },
            crossDomain: true,
            success: function (result) {
                console.log(result);
                
                if (result.success) {
                    window.location.href = "/dashboard";
                } else {
                    errorElement.text(result.message || "Login failed, please try again");
                }
            },
            error: function (jqXHR) {
                const errorMessage = jqXHR.responseJSON?.message || "Error connecting to the server";
                errorElement.text(errorMessage);
                console.error("Error:", errorMessage);
            }
        });
    });
});