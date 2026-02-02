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
// TYPEWRITER
const text = "Will you be my Valentine? ❤️";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typeText").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}
typeWriter();

// FLOATING HEARTS
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 400);

// SHOW LOVE MESSAGE ON YES
yesBtn.addEventListener("click", () => {
  document.getElementById("loveBox").style.display = "block";
});
const text = "Will you be my Valentine? ❤️";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typeText").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}
typeWriter();
let noSize = 1;

noBtn.addEventListener("click", () => {
  noSize -= 0.1;
  noBtn.style.transform = `scale(${noSize})`;
});






