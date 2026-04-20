document.addEventListener("DOMContentLoaded", () => {

let home = document.getElementById("home");
let letter = document.getElementById("letter");
let cake = document.getElementById("cake");
let backBtn = document.getElementById("backBtn");

let candle = document.getElementById("candle");
let cakeMsg = document.getElementById("cakeMsg");
let wishMsg = document.getElementById("wishMsg");
let replyMsg = document.getElementById("replyMsg");

function showScreen(screen) {
    home.classList.remove("active");
    letter.classList.remove("active");
    cake.classList.remove("active");

    screen.classList.add("active");
    backBtn.style.display = "block";
}

window.showLetter = function() {
    showScreen(letter);
}

window.showCake = function() {
    showScreen(cake);
}

window.goBack = function() {
    home.classList.add("active");
    letter.classList.remove("active");
    cake.classList.remove("active");
    backBtn.style.display = "none";

    candle.innerText = "🕯️";
    cakeMsg.innerText = "Click the candle to blow it out 🎉";
    wishMsg.innerText = "";
    replyMsg.innerText = "";
}

/* candle */
candle.addEventListener("click", () => {
    candle.innerText = "💨";
    cakeMsg.innerText = "🎉 Candle blown! Make a wish! 💖";
    launchConfetti();
});

/* INIT EMAILJS */
emailjs.init("2dmm3nTMZnIUaAyMa");

/* SEND WISH */
window.submitWish = function() {
    let wish = document.getElementById("wishInput").value;

    if (wish.trim() === "") {
        wishMsg.innerText = "Please write a wish first ✨";
        return;
    }

    emailjs.send("service_62zg4op", "template_emqjqzu", {
        message: wish
    })
    .then(() => {
        wishMsg.innerText = "Your wish has been sent 💌✨";
    })
    .catch((error) => {
        wishMsg.innerText = "Failed to send 😢";
        console.log(error);
    });
}

/* SEND FEEDBACK */
window.submitReply = function() {
    let name = document.getElementById("nameInput").value;
    let reply = document.getElementById("replyBox").value;

    if (name.trim() === "" || reply.trim() === "") {
        replyMsg.innerText = "Please fill in both name and message 💬";
        return;
    }

    emailjs.send("service_62zg4op", "template_f8qpsf9", {
        name: name,
        message: reply
    })
    .then(() => {
        replyMsg.innerText = "Reply sent 💖 Thank you!";
    })
    .catch((error) => {
        replyMsg.innerText = "Failed to send 😢";
        console.log(error);
    });
}

/* CONFETTI */
window.launchConfetti = function() {
    for (let i = 0; i < 40; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = randomColor();
        confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

function randomColor() {
    const colors = ["#ff4d6d", "#4da6ff", "#ffd166", "#06d6a0", "#8338ec"];
    return colors[Math.floor(Math.random() * colors.length)];
}

});
