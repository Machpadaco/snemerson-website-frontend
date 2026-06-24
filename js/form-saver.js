import { db } from "./firebase-config.js";
import { 
    collection, 
    addDoc, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1. Check reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert("Please verify that you are not a robot.");
            return;
        }

        // 2. Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value.trim();
        const message = document.getElementById("message").value.trim();

        // 3. Validate
        if (!name || !email || !message) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            // 4. Save to Firestore
            await addDoc(collection(db, "contactMessages"), {
                name,
                email,
                service: service || "Not selected",
                message,
                createdAt: serverTimestamp()
            });

            alert("Message submitted successfully!");

            // 5. Reset form and reCAPTCHA
            form.reset();
            grecaptcha.reset();

        } catch (error) {
            console.error("Error submitting message:", error);
            alert("Failed to send message. Try again.");
        }
    });
});
