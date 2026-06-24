// Function to load external HTML files
function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    
    // Only try to load if the element exists on the current page
    if (element) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;
                
                // OPTIONAL: If you want to highlight the active link in the header
                if(elementId === 'header-placeholder') {
                    setActiveLink(); 
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

// Optional: Function to make the current page link "active" in the nav
function setActiveLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Get the href attribute (e.g., "about.html")
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active'); // Make sure you have CSS for .active
        }
    });
}

// Load the Header and Footer when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Note: The path is 'components/...' relative to your index.html
    loadComponent("header-placeholder", "components/header.html");
    loadComponent("footer-placeholder", "components/footer.html");
});

// LOAD QUICK LINKS ON ALL PAGES EXCEPT THE HOME PAGE
document.addEventListener("DOMContentLoaded", () => {
    const quickLinksContainer = document.getElementById("quickLinksContainer");

    if (quickLinksContainer) {
        fetch("components/quicklinks.html")  // ← corrected folder name
            .then(response => response.text())
            .then(data => {
                quickLinksContainer.innerHTML = data;
            })
            .catch(error => console.error("Quick Links load error:", error));
    }
});
