console.log("Linked the comment script file.");

// // Fetch the current user's username
// fetch("/api/users/currentUser")
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     })

// Handler for the add comment button
commentButtonHandler = (event) => {
    event.preventDefault();

    // Define the values that will be submitted
    const commentText = document.querySelector("#comment").value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    // Create the post request
    fetch("/api/comments/", {
        method: "post",
        body: JSON.stringify({
            comment_text: commentText,
            post_id: post_id
          }),
          headers: { 'Content-Type': 'application/json' }
    })
    // Reload the page to show the comments
    .then(document.location.reload());
}

// event listener for comments
document.querySelector("#comment-form").addEventListener("submit", (event) => {
    commentButtonHandler(event);
});