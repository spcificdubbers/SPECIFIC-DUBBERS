document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".contact form");
    const button = form.querySelector("button");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.querySelector("input[name='name']").value.trim();
        const email = form.querySelector("input[name='email']").value.trim();
        const message = form.querySelector("textarea[name='message']").value.trim();

        // 🔍 Validation
        if (name === "" || email === "" || message === "") {
            showMessage("😑 Fill all fields properly");
            return;
        }

        if (!validateEmail(email)) {
            showMessage("😏 Enter a valid email");
            return;
        }

        // 🔄 Loading state
        button.disabled = true;
        button.innerText = "Sending...";

        const formData = new FormData(form);

        // 🚀 Send to FormSubmit
        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                showMessage("🔥 Message sent successfully!");
                form.reset();
            } else {
                showMessage("❌ Something went wrong");
            }
        })
        .catch(() => {
            showMessage("⚠️ Network error. Try again.");
        })
        .finally(() => {
            button.disabled = false;
            button.innerText = "Send";
        });

    });

    // 📧 Email validation
    function validateEmail(email) {
        return /^[^ ]+@[^ ]+\.[a-z]{2,}$/i.test(email);
    }

    // 💬 Popup message
    function showMessage(msg) {
        const box = document.createElement("div");
        box.innerText = msg;

        box.style.position = "fixed";
        box.style.bottom = "20px";
        box.style.right = "20px";
        box.style.background = "#ff3c1f";
        box.style.color = "#fff";
        box.style.padding = "12px 20px";
        box.style.borderRadius = "6px";
        box.style.fontSize = "14px";
        box.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
        box.style.zIndex = "9999";
        box.style.opacity = "0";
        box.style.transition = "0.3s";

        document.body.appendChild(box);

        // fade in
        setTimeout(() => {
            box.style.opacity = "1";
        }, 100);

        // remove after 3 sec
        setTimeout(() => {
            box.style.opacity = "0";
            setTimeout(() => box.remove(), 300);
        }, 3000);
    }

});

particlesJS("particles-js", {
  particles: {
    number: { value: 200 },
    size: { value: 2 },
    color: { value: "#ffffff" },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.5,
      width: 1
    },
    move: {
      enable: true,
      speed: 5,
      direction: "all"   // random
    }
  }
});