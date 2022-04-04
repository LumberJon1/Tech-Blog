
document.querySelector("#navbar").addEventListener("click", (event) => {
    if (event.target.getAttribute("id") === "logout-btn") {
        fetch("/api/users/logout", {
            method: "post",
            headers: {"Content-Type": "application/json"}
        })
        .then((response) => {
            if (response.ok) {
                console.log("Logging out...");
                document.location.replace("/");
            }
            else {
                alert(response.statusText);
            }
        });
    }
    else if (event.target.getAttribute("id") === "login-btn") {
        document.location.replace("/login");
    }
    else if (event.target.getAttribute("id") === "dashboard-btn") {
        document.location.replace("/dashboard");
    }
    else if (event.target.getAttribute("id") === "homepage-btn") {
        document.location.replace("/");
    }
});