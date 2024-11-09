document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    try {
        const response = await axios.post("http://localhost/login.php", {
            username: loginUsername,
            password: loginPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.data.id) {
            localStorage.setItem("userId", response.data.id);
            window.location.href = '/tracker.html'
        } else {
            document.getElementById("loginMessage").innerText = "Authentication failed";
        }
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("loginMessage").innerText = "An error occurred. Please try again.";
    }
});

document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const registerUsername = document.getElementById("registerUsername").value;
    const registerPassword = document.getElementById("registerPassword").value;

    try {
        const response = await axios.post("http://localhost/register.php", {
            username: registerUsername,
            password: registerPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.data.id) {
            // Store the user ID in local storage
            localStorage.setItem("userId", response.data.id);
            window.location.href = '/tracker.html'
        } else {
            document.getElementById("registerMessage").innerText = "Registration failed";
        }
    } catch (error) {
        console.error("Error during registration:", error);
        document.getElementById("registerMessage").innerText = "An error occurred. Please try again.";
    }
});
