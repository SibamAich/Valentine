const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const card = document.querySelector(".card");

const hoverSound = document.getElementById("hoverSound");
const noSound = document.getElementById("noSound");
const yaySound = document.getElementById("yaySound");
const bgMusic = document.getElementById("bgMusic");

const questions = [
  "Are you sure? 🤨",
  "Really sure?? 😳",
  "Think again 🥺",
  "Last chance 😤",
  "My heart is breaking 💔",
  "Just say YES 😭"
];

let q = 0;
let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    bgMusic.volume = 0.4;
    bgMusic.play().catch(() => {});
    musicStarted = true;
  }
}

document.body.addEventListener("click", startMusic, { once: true });

function vibrate(p) {
  if (navigator.vibrate) navigator.vibrate(p);
}

function moveNo() {
  startMusic();
  hoverSound.currentTime = 0;
  hoverSound.play();
  vibrate(40);

  card.classList.add("shake");
  setTimeout(() => card.classList.remove("shake"), 400);

  noBtn.style.left = Math.random() * 150 + "px";
  noBtn.style.top = Math.random() * 60 + "px";
}

noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("touchstart", moveNo);

noBtn.addEventListener("click", () => {
  noSound.play();
  message.textContent = questions[q++ % questions.length];
  moveNo();
});

function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.textContent = ["❤️","🎉","✨","💖"][Math.floor(Math.random()*4)];
    c.style.left = Math.random() * 100 + "vw";
    c.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

yesBtn.addEventListener("click", () => {
  startMusic();
  yaySound.play();
  vibrate([200,100,200]);
  message.textContent = "Thank you ❤️";
  noBtn.remove();
  yesBtn.disabled = true;
  launchConfetti();
});
document.body.addEventListener("click", () => {
  bgMusic.play();
}, { once: true });

