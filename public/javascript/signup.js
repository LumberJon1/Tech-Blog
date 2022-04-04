console.log("sign up page script");

// Handler for the signup button
signupHandler = (event) => {
    event.preventDefault();

    // Grab the user data
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username && password) {
        // Post to create a user
        fetch("/api/users/", {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(
            fetch("/api/users/login", {
                method: 'post',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            })
        )
        .then(document.location.replace("/login"));
    }
}

// Listener for the signup button
document.querySelector("#signup-form").addEventListener("submit", event => {
    signupHandler(event);
})

// Back to homepage
document.querySelector("#homepage-btn").addEventListener("click", () => {
    document.location.replace("/");
});
