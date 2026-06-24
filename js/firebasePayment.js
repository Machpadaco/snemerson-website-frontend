import { db, storage } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } 
    from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } 
    from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";
import { showNotification } from './notifications.js';

const paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = paymentForm.querySelector('button');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        const payerName = document.getElementById('payerName').value.trim();
        const amountPaid = parseFloat(document.getElementById('amountPaid').value);
        const purpose = document.getElementById('purpose').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const receiptFile = document.getElementById('receiptFile').files[0];

        if (!receiptFile) throw new Error("Please upload a receipt file.");

        // Upload receipt
        const fileRef = ref(storage, `payment_receipts/${Date.now()}_${receiptFile.name}`);
        await uploadBytes(fileRef, receiptFile);
        const receiptURL = await getDownloadURL(fileRef);

        // Save to Firestore
        await addDoc(collection(db, 'payments'), {
            payerName,
            amount: amountPaid,
            purpose,
            phoneNumber,
            receiptURL,
            submittedAt: serverTimestamp()
        });

        showNotification('Payment submitted successfully!', 'success');
        paymentForm.reset();

    } catch (error) {
        console.error(error);
        showNotification(`Error: ${error.message}`, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Payment';
    }
});
