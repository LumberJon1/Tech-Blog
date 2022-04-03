console.log("Linked script correctly.");

// Dashboard button handler

// Login button handler
const loginButtonHandler = () => {
    
    document.location.replace("/login");
    
}

document.getElementById("login-btn").addEventListener("click", loginButtonHandler);