// js/notifications.js
export function showNotification(message, type = 'success') {
    let container = document.getElementById('notification-box');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-box';
        container.className = 'fixed top-4 right-4 z-50 transition-opacity duration-300 opacity-0 pointer-events-none';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <div class="py-3 px-6 rounded-lg shadow-md text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}">
            ${message}
        </div>
    `;

    container.classList.remove('opacity-0', 'pointer-events-none');
    container.classList.add('opacity-100');

    setTimeout(() => {
        container.classList.add('opacity-0', 'pointer-events-none');
    }, 5000);
}
