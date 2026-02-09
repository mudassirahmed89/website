window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};



function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
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
    return;
  }

  if (!heartsStarted) {
    startHearts();
    heartsStarted = true;
  }

  scrollToSection("apology");
}

function closeModal() {
  document.getElementById("musicModal").style.display = "none";
}



/* Floating Hearts Function */
function startHearts() {
  setInterval(() => {

    let random = Math.random();
    let heartSymbol = "❤️"; // default red

    // 70% Red, 20% Purple, 10% Pink
    if (random < 0.70) {
      heartSymbol = "❤️";
    } else if (random < 0.90) {
      heartSymbol = "💜";
    } else {
      heartSymbol = "💗";
    }

    let heart = document.createElement("div");
    heart.innerHTML = heartSymbol;
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 22 + 12) + "px";
    heart.style.animation = "floatUp 6s linear";

    document.getElementById("hearts-container").appendChild(heart);

    setTimeout(() => heart.remove(), 6000);

  }, 350); // faster hearts (more romantic)
}


/* Apology typing effect */
const apologyMessage = `My jaanu... I know I hurt you, and I hate that I became the reason for your sadness.
I don’t want to defend myself… I just want to say I’m truly sorry.

You are not just a part of my life...
you are my peace, my happiness, my home.

Please forgive me jaanu...
I promise I will be better — not with words, but with actions 💜`;

let i = 0;
function typeApology() {
  if (i < apologyMessage.length) {
    document.getElementById("apologyText").innerHTML += apologyMessage.charAt(i);
    i++;
    setTimeout(typeApology, 35);
  }
}
window.onload = typeApology;

/* Gallery slider */
const deckImages = [
  { caption: "This smile is my peace 💜" },
  { caption: "My favorite memory 🌙" },
  { caption: "You are my happiness 😭💜" },
  { caption: "Forever with you 💍💜" },
  { caption: "My jaanu, my world ❤️" }
];

let deckIndex = 0;

function updateDeck() {
  const cards = document.querySelectorAll(".deck-card");
  const caption = document.getElementById("deckCaption");

  cards.forEach((card, i) => {
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

  // Position them like deck
  cards[active].style.left = "230px";

  cards[left].style.left = "80px";
  cards[right].style.left = "380px";

  cards[farLeft].style.left = "0px";
  cards[farRight].style.left = "460px";

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

window.addEventListener("load", () => {
  updateDeck();
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

  confettiEffect();
}

function forgiveNo() {
  document.getElementById("responseText").innerHTML =
    "🥺 Okay jaanu... I understand. But I’ll still keep trying until I see your smile again 💜";
}
let noHoverCount = 0;

function moveNoButton() {
  const noBtn = document.getElementById("noBtn");
  const section = document.getElementById("forgive");

  noHoverCount++;

  // Random movement range
  const x = Math.random() * 250 - 125;
  const y = Math.random() * 150 - 75;

  noBtn.style.position = "relative";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  // Cute messages after attempts
  const responseText = document.getElementById("responseText");

  if (noHoverCount === 2) {
    responseText.innerHTML = "😳 Oii jaanu... why you going near NO?";
  } 
  else if (noHoverCount === 4) {
    responseText.innerHTML = "🥺 Pleaseee jaanu... don’t click no 😭💜";
  } 
  else if (noHoverCount === 6) {
    responseText.innerHTML = "😤 No button is not allowed for my jaanu 😭❤️";
  } 
  else if (noHoverCount === 8) {
    responseText.innerHTML = "💍 Jaanu I cannot take NO as an answer... only YES 😭💜";
  } 
  else if (noHoverCount >= 10) {
    responseText.innerHTML = "😭 Okay okayyy I surrender... please forgive me jaanu ❤️";
  }
}

/* Confetti Effect */
function confettiEffect() {
  for (let i = 0; i < 100; i++) {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

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

  // Reset when user scrolls up a bit
  if (!reachedBottom) {
    finalModalOpen = false;
  }
});

function closeFinalModal() {
  document.getElementById("finalModal").style.display = "none";
}


