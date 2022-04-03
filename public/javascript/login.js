
// Login form handler
async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }

// Login buttn event listener
document.querySelector("#login-form").addEventListener("submit", loginFormHandler);

// Signup Link Handler
document.querySelector("#signup-link").addEventListener("click", () => {
  document.location.replace("/signup");
})