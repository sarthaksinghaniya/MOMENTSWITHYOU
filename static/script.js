// static/script.js

const images = JSON.parse(document.currentScript.getAttribute('data-images') || '[]');
const paragraphs = JSON.parse(document.currentScript.getAttribute('data-paragraphs') || '[]');

let imgIndex = 0;
let paraIndex = 0;
let imgInterval = null;
let paraInterval = null;

const imgTag = document.getElementById("slideshow");
const textTag = document.getElementById("romanticText");

function startSlides() {
  clearInterval(imgInterval);
  clearInterval(paraInterval);

  imgInterval = setInterval(() => {
    imgIndex = (imgIndex + 1) % images.length;
    imgTag.src = `/static/images/${images[imgIndex]}`;
    imgTag.className = images[imgIndex].includes("IMG-20250714") ? "rotate" : "";
  }, 5000);

  paraInterval = setInterval(() => {
    paraIndex = (paraIndex + 1) % paragraphs.length;
    textTag.innerHTML = paragraphs[paraIndex];
  }, 8000);
}

function pauseSlides() {
  clearInterval(imgInterval);
  clearInterval(paraInterval);
  imgInterval = null;
  paraInterval = null;
}

function resumeSlides() {
  if (!imgInterval && !paraInterval) startSlides();
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

function updateTimer() {
  const start = new Date("2025-03-10T20:46:07");
  const now = new Date();
  let diff = now - start;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let mins = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("timeCount").innerText = `${days} days, ${hrs} hrs, ${mins} min 💞`;
}

setInterval(updateTimer, 60000);
updateTimer();

function checkUnlock() {
  const val = document.getElementById("unlockInput").value.trim().toLowerCase();
  const valid = ["22 oct", "22/10", "22-10"];
  if (valid.includes(val)) {
    document.getElementById("unlockScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "block";

    // FIXED: Play after user action
    const music = document.getElementById("bgMusic");
    setTimeout(() => {
      music.play().then(() => {
        console.log("Music started 🎵");
      }).catch((err) => {
        console.log("User interaction needed to start music manually:", err);
      });
    }, 300); // slight delay to allow render

    startSlides();
    triggerFireworks();
  } else {
    document.getElementById("unlockMsg").innerText =
      "That's not the day we met... try again 😔";
  }
}


function triggerFireworks() {
  const today = new Date();
  const canvas = document.getElementById("fireworksCanvas");
  if (today.getMonth() === 7 && today.getDate() >= 1) {
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const hearts = [];
    for (let i = 0; i < 100; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 4,
        speed: Math.random() * 1 + 0.5,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(h => {
        ctx.beginPath();
        ctx.fillStyle = h.color;
        ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
        ctx.fill();
        h.y -= h.speed;
        if (h.y < 0) h.y = canvas.height;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
}
