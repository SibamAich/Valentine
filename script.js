/* script.js */
// --- SCREENS ---
const introScreen = document.getElementById("introScreen");
const mainScreen = document.getElementById("mainScreen");

// --- INTRO BUTTONS ---
const introYesBtn = document.getElementById("introYesBtn");
const introNoBtn = document.getElementById("introNoBtn");

// --- MAIN BUTTONS ---
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const loveBox = document.getElementById("loveBox");

// --- AUDIO ---
const hoverSound = document.getElementById("hoverSound");
const noSound = document.getElementById("noSound");
const yaySound = document.getElementById("yaySound");
const bgMusic = document.getElementById("bgMusic");

let musicStarted = false;

// --- MUSIC FADE IN FUNCTION ---
function startMusic() {
  if (!musicStarted) {
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.4) {
          vol += 0.02;
          bgMusic.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 200);
    }).catch(e => console.log("Waiting for interaction..."));
    musicStarted = true;
  }
}

// --- INTRO SCREEN LOGIC ---

// 1. INTRO "NO" (The annoying dialogs)
introNoBtn.addEventListener("click", () => {
  startMusic(); // Start music immediately!
  
  // Dialog Loop
  alert("Are you sure? 🤨");
  alert("Really? It's a dare! 😤");
  alert("Don't be scared... 🥺");
  alert("Just click YES! 💖");
});

// 2. INTRO "YES" (Switch to Main Screen)
introYesBtn.addEventListener("click", () => {
  startMusic(); // Start music
  
  // Switch Screens
  introScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  
  // Start the Typewriter ONLY now
  typeWriter();
});


// --- MAIN SCREEN LOGIC ---

// Runaway "No" Button
function moveNo() {
  hoverSound.currentTime = 0;
  hoverSound.play();
  
  // Shake animation
  mainScreen.classList.add("shake");
  setTimeout(() => mainScreen.classList.remove("shake"), 400);

  // Move button
  noBtn.style.left = Math.random() * 100 + "px"; // adjusted for simpler layout
  noBtn.style.top = Math.random() * 50 + "px";
}

noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("click", () => {
  noSound.currentTime = 0;
  noSound.play();
  moveNo();
});

// Final "Yes" Button
yesBtn.addEventListener("click", () => {
  yaySound.play();
  
  // Hide UI
  noBtn.style.display = "none";
  yesBtn.style.display = "none"; 
  document.getElementById("typeText").style.display = "none";
  document.querySelector("#mainScreen h1").style.display = "none";

  // Show Love Box
  loveBox.classList.remove("hidden");
  loveBox.style.display = "block";
  
  launchConfetti();
});


// --- ANIMATIONS ---

// Confetti
function launchConfetti() {
  for (let i = 0; i < 50; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.textContent = ["❤️","🎉","✨","💖"][Math.floor(Math.random()*4)];
    c.style.left = Math.random() * 100 + "vw";
    c.style.animationDuration = 2 + Math.random() * 3 + "s";
    c.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

// Typewriter (Starts when called)
const text = "Will you be my Valentine? ❤️";
let i = 0;
function typeWriter() {
  const typeTarget = document.getElementById("typeText");
  if (i < text.length) {
    typeTarget.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}

// Floating Hearts
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 10 + "px"; 
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);
