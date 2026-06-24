import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const loginForm = document.getElementById("adminLoginForm");
const errorDisplay = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorDisplay.textContent = "";

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    try {
        await signInWithEmailAndPassword(auth, email, password);

        // Redirect to admin panel
        window.location.href = "admin-panel.html";

    } catch (error) {
        errorDisplay.textContent = "Invalid email or password.";
        console.error("Login Error:", error);
    }
});
