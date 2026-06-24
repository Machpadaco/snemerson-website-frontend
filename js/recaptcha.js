document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".recaptcha-form");

    forms.forEach((form) => {
        form.addEventListener("submit", function (e) {

            const captcha = form.querySelector(".g-recaptcha-response");

            if (!captcha || captcha.value === "") {
                e.preventDefault();
                alert("Please verify you are not a robot.");
            }
        });
    });
});
