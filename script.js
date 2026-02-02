document.addEventListener('DOMContentLoaded', () => {
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

  // --- MUSIC FADE IN ---
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
  if (introNoBtn) {
    introNoBtn.addEventListener("click", () => {
      startMusic();
      alert("Are you sure? 🤨");
      alert("Really? It's a dare! 😤");
      alert("Don't be scared... 🥺");
      alert("Just click YES! 💖");
    });
  }

  if (introYesBtn) {
    introYesBtn.addEventListener("click", () => {
      startMusic();
      introScreen.classList.add("hidden");
      mainScreen.classList.remove("hidden");
      typeWriter();
    });
  }

  // --- MAIN SCREEN LOGIC ---
  function moveNo() {
    if (!musicStarted) startMusic();
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {});
    
    // Move button
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    
    // Ensure button stays on screen (Fixed positioning logic)
    noBtn.style.position = "fixed"; 
    noBtn.style.left = Math.max(10, Math.min(x, window.innerWidth - 100)) + "px";
    noBtn.style.top = Math.max(10, Math.min(y, window.innerHeight - 100)) + "px";
  }

  if (noBtn) {
    noBtn.addEventListener("mouseover", moveNo);
    noBtn.addEventListener("click", () => {
      noSound.currentTime = 0;
      noSound.play().catch(() => {});
      moveNo();
    });
  }

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      startMusic();
      yaySound.play().catch(() => {});
      
      noBtn.style.display = "none";
      yesBtn.style.display = "none"; 
      document.getElementById("typeText").style.display = "none";
      const h1 = document.querySelector("#mainScreen h1");
      if(h1) h1.style.display = "none";

      loveBox.classList.remove("hidden");
      loveBox.style.display = "block";
      
      launchConfetti();
    });
  }

  // --- TYPEWRITER ---
  const text = "Will you be my Valentine? ❤️";
  let i = 0;
  function typeWriter() {
    const typeTarget = document.getElementById("typeText");
    if (i < text.length && typeTarget) {
      typeTarget.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  }

  // --- CONFETTI ---
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

  // --- FLOATING HEARTS ---
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 10 + "px"; 
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 500);

});
