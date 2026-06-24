import { db, auth } from "./firebase-config.js";

import { 
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


const tableBody = document.getElementById("messagesTableBody");
const logoutBtn = document.getElementById("logoutBtn");


// 🔐 Redirect if NOT logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "admin-login.html";
    } else {
        loadMessages();
    }
});


// 🔐 Logout
logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
});


// 📩 Load Firestore Data
async function loadMessages() {
    tableBody.innerHTML = `
        <tr><td colspan="5">Loading messages...</td></tr>
    `;

    try {
        const querySnapshot = await getDocs(collection(db, "contactMessages"));

        if (querySnapshot.empty) {
            tableBody.innerHTML = `
                <tr><td colspan="5">No messages found.</td></tr>
            `;
            return;
        }

        tableBody.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const dateStr = data.createdAt
                ? data.createdAt.toDate().toLocaleString()
                : "N/A";

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${data.name || "N/A"}</td>
                <td>${data.email || "N/A"}</td>
                <td>${data.service || "N/A"}</td>
                <td>${data.message || "N/A"}</td>
                <td>${dateStr}</td>
            `;

            tableBody.appendChild(tr);
        });

    } catch (error) {
        console.error("Error loading messages:", error);
        tableBody.innerHTML = `
            <tr><td colspan="5">Error loading messages.</td></tr>
        `;
    }
}
