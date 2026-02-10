window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  typeApology();
  updateDeck();
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

function scrollToSection(id) {
  const section = document.getElementById(id);
  const navbarHeight = document.querySelector(".navbar").offsetHeight;

  const y = section.getBoundingClientRect().top + window.scrollY - navbarHeight - 15;

  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}


/* Music */
let musicPlaying = false;
let heartsStarted = false;

function toggleMusic() {
  let music = document.getElementById("bgMusic");
  let btn = document.querySelector(".music-btn");

  if (!musicPlaying) {
    music.play();
    btn.innerText = "⏸ Pause";
    musicPlaying = true;
  } else {
    music.pause();
    btn.innerText = "🎶 Play";
    musicPlaying = false;
  }
}

/* Start Button Logic */
function startJourney() {
  if (!musicPlaying) {
    document.getElementById("musicModal").style.display = "flex";
    document.body.style.overflow = "hidden";
    return;
  }

  continueJourney();
}

function continueJourney() {

  if (!heartsStarted) {
    startHearts();
    heartsStarted = true;
  }

  // Smooth slow transition
  setTimeout(() => {
    document.getElementById("apology").scrollIntoView({ behavior: "smooth" });
  }, 400);
}


function playMusicAndContinue() {
  let music = document.getElementById("bgMusic");
  let btn = document.querySelector(".music-btn");

  music.play();
  musicPlaying = true;
  btn.innerText = "⏸ Pause";

  document.getElementById("musicModal").style.display = "none";
  document.body.style.overflow = "auto";

  continueJourney();
}


function closeModal() {
  document.getElementById("musicModal").style.display = "none";
}

/* Floating Hearts Function */
function startHearts() {
  setInterval(() => {
    let random = Math.random();
    let heartSymbol = "❤️";

    if (random < 0.70) heartSymbol = "❤️";
    else if (random < 0.90) heartSymbol = "💜";
    else heartSymbol = "💗";

    let heart = document.createElement("div");
    heart.innerHTML = heartSymbol;
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 22 + 12) + "px";
    heart.style.animation = "floatUp 6s linear";

    document.getElementById("hearts-container").appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
  }, 350);
}

/* Apology typing effect */
const apologyMessage = `My jaanu... I know I hurt you, and I hate that I became the reason for your sadness.
I don’t want to defend myself… I just want to say I’m truly sorry.

You are not just a part of my life...
you are my peace, my happiness, my home.

Please forgive me jaanu...
I promise I will be better — not with words, but with actions 💜`;

let apologyIndex = 0;
let apologyStarted = false;

function typeApology() {
  if (apologyIndex < apologyMessage.length) {
    document.getElementById("apologyText").innerHTML += apologyMessage.charAt(apologyIndex);
    apologyIndex++;
    setTimeout(typeApology,89);
  }
}

// Start typing only when section is visible
window.addEventListener("scroll", () => {
  const apologySection = document.getElementById("apology");
  const rect = apologySection.getBoundingClientRect();

  if (!apologyStarted && rect.top < window.innerHeight - 100) {
    apologyStarted = true;
    typeApology();
  }
});

let memoriesTyped = false;

const memoriesMessage = "Now jaanu... let us relive all the beautiful memories we made together 💜";

function typeMemoriesIntro() {
  const target = document.getElementById("memoriesIntroText");
  let j = 0;

  function type() {
    if (j < memoriesMessage.length) {
      target.innerHTML += memoriesMessage.charAt(j);
      j++;
      setTimeout(type, 35);
    }
  }
  type();
}

window.addEventListener("scroll", () => {
  const memoriesSection = document.getElementById("memories");
  const sectionTop = memoriesSection.getBoundingClientRect().top;

  // When section comes into view
  if (sectionTop < window.innerHeight - 150 && !memoriesTyped) {
    memoriesTyped = true;
    typeMemoriesIntro();
  }
});


/* Deck Carousel */
const deckImages = [
  { caption: "This smile is my peace and happiness💜" },
  { caption: "My favorite memory 🌙" },
  { caption: "You are my happiness 😭💜" },
  { caption: "My jaanu, my world ❤️" },
  { caption: "Forever with you 💍💜" }
];

let deckIndex = 0;

function updateDeck() {
  const cards = document.querySelectorAll(".deck-card");
  const caption = document.getElementById("deckCaption");

  cards.forEach((card) => {
    card.className = "deck-card";
  });

  const total = cards.length;

  const active = deckIndex;
  const left = (deckIndex - 1 + total) % total;
  const right = (deckIndex + 1) % total;
  const farLeft = (deckIndex - 2 + total) % total;
  const farRight = (deckIndex + 2) % total;

  cards[active].classList.add("active");
  cards[left].classList.add("left");
  cards[right].classList.add("right");
  cards[farLeft].classList.add("far-left");
  cards[farRight].classList.add("far-right");

  caption.innerText = deckImages[deckIndex].caption;
}

function nextDeck() {
  deckIndex = (deckIndex + 1) % deckImages.length;
  updateDeck();
}

function prevDeck() {
  deckIndex = (deckIndex - 1 + deckImages.length) % deckImages.length;
  updateDeck();
}

/* Swipe support for mobile */
let startX = 0;
const deckContainer = document.getElementById("deckContainer");

deckContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

deckContainer.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (diff > 50) nextDeck();
  if (diff < -50) prevDeck();
});

/* Auto Play Carousel */
let autoDeckInterval;

function startAutoDeck() {
  autoDeckInterval = setInterval(() => {
    nextDeck();
  }, 3500); // change speed here (3.5 sec)
}

function stopAutoDeck() {
  clearInterval(autoDeckInterval);
}

/* Start autoplay when page loads */
window.addEventListener("load", () => {
  startAutoDeck();
});

/* Pause autoplay when user interacts */
deckContainer.addEventListener("touchstart", () => {
  stopAutoDeck();
});

deckContainer.addEventListener("touchend", () => {
  startAutoDeck();
});

/* Pause on hover (desktop) */
deckContainer.addEventListener("mouseenter", () => {
  stopAutoDeck();
});

deckContainer.addEventListener("mouseleave", () => {
  startAutoDeck();
});


/* Secret surprise */
function showSecret() {
  document.getElementById("secretMessage").innerHTML =
    "😭💜 Surprise jaanu... you are my most beautiful blessing. I love you more than words can ever explain.";
}

/* Forgiveness buttons */
function forgiveYes() {
  document.getElementById("responseText").innerHTML =
    "😭💜 YAYYY!! Thank you jaanu... I promise I’ll never hurt you again. You are my forever 💍✨";

  const noBtn = document.getElementById("noBtn");

  // Get button position
  const rect = noBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Create burst particles
  for (let i = 0; i < 25; i++) {
    let particle = document.createElement("div");
    particle.classList.add("burst-particle");

    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";

    const x = (Math.random() * 200 - 100) + "px";
    const y = (Math.random() * 200 - 100) + "px";

    particle.style.setProperty("--x", x);
    particle.style.setProperty("--y", y);

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 900);
  }

  // Button burst animation
  noBtn.style.transition = "0.5s ease";
  noBtn.style.transform = "scale(1.6) rotate(20deg)";
  noBtn.style.opacity = "0";

  setTimeout(() => {
    noBtn.style.display = "none";
  }, 500);

  confettiEffect();
}



let noHoverCount = 0;

function moveNoButton() {
  const noBtn = document.getElementById("noBtn");

  noHoverCount++;

  const x = Math.random() * 250 - 125;
  const y = Math.random() * 150 - 75;

  noBtn.style.position = "relative";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  const responseText = document.getElementById("responseText");

  if (noHoverCount === 2) {
    responseText.innerHTML = "😳 Oii jaanu... why you going near NO?";
  } else if (noHoverCount === 4) {
    responseText.innerHTML = "🥺 Pleaseee jaanu... don’t click no 😭💜";
  } else if (noHoverCount === 6) {
    responseText.innerHTML = "😤 No button is not allowed for my jaanu 😭❤️";
  } else if (noHoverCount === 8) {
    responseText.innerHTML = "💍 Jaanu I cannot take NO as an answer... only YES 😭💜";
  } else if (noHoverCount >= 10) {
    responseText.innerHTML = "😭 Okay okayyy I surrender... please forgive me jaanu ❤️";
  }
}

/* Confetti Effect */
function confettiEffect() {

  // 🔥 Burst at start (instant petals)
  for (let i = 0; i < 40; i++) {
    createPetal();
  }

  // 🌸 Then smooth rain
  let petalsCount = 0;

  const petalInterval = setInterval(() => {
    createPetal();
    petalsCount++;

    if (petalsCount >= 90) {
      clearInterval(petalInterval);
    }
  }, 80);

}

/* Helper function */
function createPetal() {
  let petal = document.createElement("div");
  petal.classList.add("confetti");

  petal.style.left = Math.random() * 100 + "vw";

  const size = Math.random() * 8 + 10;
  petal.style.width = size + "px";
  petal.style.height = (size - 3) + "px";

  petal.style.animationDuration = (Math.random() * 3 + 5) + "s";
  petal.style.animationDelay = (Math.random() * 1.2) + "s";

  document.body.appendChild(petal);

  setTimeout(() => petal.remove(), 10000);
}




/* Final Modal on Scroll Bottom */
let finalModalOpen = false;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  const reachedBottom = (scrollTop + windowHeight) >= (docHeight - 20);

  if (reachedBottom && !finalModalOpen) {
    document.getElementById("finalModal").style.display = "flex";
    finalModalOpen = true;
  }

  if (!reachedBottom) {
    finalModalOpen = false;
  }
});

function closeFinalModal() {
  document.getElementById("finalModal").style.display = "none";
}

/* Timeline image modal */
function openImageModal(imgSrc, title) {
  document.getElementById("imageTitle").innerText = title;
  document.getElementById("modalImage").src = imgSrc;
  document.getElementById("imageModal").style.display = "flex";
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}


function openImageModal(imgSrc, title) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("imageTitle");

  modalTitle.innerText = title;
  modalImage.src = imgSrc;

  modal.style.display = "flex";

  setTimeout(() => {
    modal.classList.add("show");
  }, 20);
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");

  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
  }, 350);
}

document.getElementById("imageModal").addEventListener("click", function(e) {
  if (e.target.id === "imageModal") {
    closeImageModal();
  }
});


let hugTyped = false;

function showHug() {
  const hugBox = document.getElementById("hugBox");
  const hugMessage = document.getElementById("hugMessage");
  const heart = document.querySelector(".hidden-heart");

  // Heart pulse
  heart.classList.add("clicked");
  setTimeout(() => heart.classList.remove("clicked"), 700);

  // Show hug box smoothly
  hugBox.style.display = "block";

  setTimeout(() => {
    hugBox.classList.add("show");

    // Scroll slightly to hug gif
    hugBox.scrollIntoView({ behavior: "smooth", block: "center" });

  }, 50);

  // Confetti every click
  sideConfettiEffect();

  // Type message only once
  if (hugTyped) return;
  hugTyped = true;

  const message =
    "😭💜 A virtual hug for my jaanu 🧸❤️\n" +
    "I’m holding you tight\n" +
    "and I promise I’ll never let you down ever again 🌙💍";

  let index = 0;
  hugMessage.innerHTML = "";

  function typeHug() {
    if (index < message.length) {
      hugMessage.innerHTML += message.charAt(index) === "\n" ? "<br>" : message.charAt(index);
      index++;
      setTimeout(typeHug, 35);
    }
  }

  typeHug();
}


function sideConfettiEffect() {

  // 🔥 Burst at start
  for (let i = 0; i < 80; i++) {
    createSideSparkle();
  }

  // ✨ Then smooth stream
  let count = 0;

  const sparkleInterval = setInterval(() => {
    createSideSparkle();
    count++;

    if (count >= 140) {
      clearInterval(sparkleInterval);
    }
  }, 60);
}

/* Helper function */
function createSideSparkle() {
  let confetti = document.createElement("div");
  confetti.classList.add("confetti-side");

  const side = Math.random() < 0.5 ? "left" : "right";
  confetti.style.top = Math.random() * 100 + "vh";

  const size = Math.random() * 5 + 4;
  confetti.style.width = size + "px";
  confetti.style.height = size + "px";

  confetti.style.animationDelay = (Math.random() * 0.6) + "s";
  confetti.style.animationDuration = (Math.random() * 2 + 4) + "s";

  const drift = (Math.random() * 200 - 100) + "px";
  confetti.style.setProperty("--drift", drift);

  if (side === "left") {
    confetti.style.left = "-15px";
    confetti.style.animationName = "shootRight";
  } else {
    confetti.style.left = "100vw";
    confetti.style.animationName = "shootLeft";
  }

  document.body.appendChild(confetti);

  setTimeout(() => confetti.remove(), 7000);
}


const bgMusic = document.getElementById("bgMusic");
const loveVideo = document.getElementById("loveVideo");


loveVideo.addEventListener("play", () => {
  bgMusic.volume = 0.15; // reduce volume
});

loveVideo.addEventListener("pause", () => {
  bgMusic.volume = 1.0; // normal volume
});

loveVideo.addEventListener("ended", () => {
  bgMusic.volume = 1.0;
});


