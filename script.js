document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTS ---
  const introScreen = document.getElementById("introScreen");
  const mainScreen = document.getElementById("mainScreen");
  
  const introYesBtn = document.getElementById("introYesBtn");
  const introNoBtn = document.getElementById("introNoBtn");
  
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const message = document.getElementById("message");
  const loveBox = document.getElementById("loveBox");
  const typeTextElement = document.getElementById("typeText");

  // --- AUDIO ---
  const hoverSound = document.getElementById("hoverSound");
  const noSound = document.getElementById("noSound");
  const yaySound = document.getElementById("yaySound");
  const bgMusic = document.getElementById("bgMusic");

  // --- VARIABLES ---
  let musicStarted = false;
  const questions = [
    "Are you sure? 🤨",
    "Really sure?? 😳",
    "Think again 🥺",
    "Last chance 😤",
    "My heart is breaking 💔",
    "Just say YES 😭"
  ];
  let qIndex = 0;

  // --- MUSIC LOGIC ---
  function startMusic() {
    if (!musicStarted) {
      bgMusic.volume = 0;
      bgMusic.play().then(() => {
        // Fade in
        let vol = 0;
        const fadeIn = setInterval(() => {
          if (vol < 0.4) {
            vol += 0.02;
            bgMusic.volume = vol;
          } else {
            clearInterval(fadeIn);
          }
        }, 200);
      }).catch(() => {
        console.log("Music blocked until interaction");
      });
      musicStarted = true;
    }
  }

  // --- INTRO SCREEN EVENTS ---
  
  // Intro "No" Button -> Annoying Alerts
  if (introNoBtn) {
    introNoBtn.addEventListener("click", () => {
      startMusic();
      alert("Are you sure? 🤨");
      alert("Really? It's a dare! 😤");
      alert("Don't be scared... 🥺");
      alert("Just click YES! 💖");
    });
  }

// Intro "Yes" Button -> Transition to Main
  if (introYesBtn) {
    introYesBtn.addEventListener("click", () => {
      startMusic();
      
      // 1. CHANGE TO ROMANTIC BACKGROUND 👇
      // (Using a reliable pink clouds image from Unsplash)
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1490750967868-58cb75063ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')";
      
      // Hide Intro, Show Main
      introScreen.classList.add("hidden");
      introScreen.style.display = "none"; 
      
      mainScreen.classList.remove("hidden");
      mainScreen.style.display = "block"; 
      
      // Start Typewriter
      typeWriter();
    });
  }

  // --- MAIN SCREEN EVENTS ---

  // Runaway No Button
  function moveNoBtn() {
    startMusic(); // Ensure music plays if they try to touch No
    hoverSound.currentTime = 0;
    hoverSound.play().catch(()=>{});

    // Make the button "Fixed" so it can move anywhere on screen
    noBtn.style.position = "fixed"; 
    
    // Calculate random position within window bounds
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
    
    noBtn.style.left = `${Math.max(10, x)}px`;
    noBtn.style.top = `${Math.max(10, y)}px`;
  }

  if (noBtn) {
    noBtn.addEventListener("mouseover", moveNoBtn);
    noBtn.addEventListener("touchstart", moveNoBtn); // For mobile
    
    noBtn.addEventListener("click", () => {
      noSound.currentTime = 0;
      noSound.play().catch(()=>{});
      
      // Update text inside the message div
      if (message) {
        message.textContent = questions[qIndex % questions.length];
        qIndex++;
      }
      moveNoBtn();
    });
  }

  // Final Yes Button
  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      startMusic();
      yaySound.play().catch(()=>{});
      // CHANGE BACKGROUND IMAGE 👇
      document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/1e/0e/8c/1e0e8c25740445759719111451457145.jpg')";
      
      // Hide buttons and text
      noBtn.style.display = "none";
      yesBtn.style.display = "none";
      if (typeTextElement) typeTextElement.style.display = "none";
      if (message) message.style.display = "none";
      
      // Hide the "Tani..." header if it exists
      const mainHeader = mainScreen.querySelector("h1");
      if (mainHeader) mainHeader.style.display = "none";

      // Show the Love Box
      if (loveBox) {
        loveBox.classList.remove("hidden");
        loveBox.style.display = "block";
      }

      launchConfetti();
    });
  }

  // --- UTILITIES ---

  // Typewriter
  const text = "Will you be my Valentine? ❤️";
  let i = 0;
  function typeWriter() {
    if (i < text.length && typeTextElement) {
      typeTextElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  }

  // Confetti
  function launchConfetti() {
    for (let j = 0; j < 50; j++) {
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

  // Background Hearts
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


