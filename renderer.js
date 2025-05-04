const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);

const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = Math.floor(Math.random() * canvas.height);
}

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slightly transparent black for fading effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0f0'; // Bright green for matrix characters
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0; // Reset drop to the top
    }

    drops[i]++;
  }

  // Add random glitch effect
  if (Math.random() > 0.9) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'; // Red glitch overlay
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 100,
      Math.random() * 100
    );
  }
}

setInterval(drawMatrix, 50); // Call drawMatrix every 50ms

// Countdown timer
let seconds = 30;
const timerElement = document.getElementById('timer');

function playCreepyVoice() {
  const creepyVoice = new Audio('creepy-voice.mp3'); // Replace with your audio file
  creepyVoice.play();
}

function playWarningSound() {
  const warningSound = new Audio('warning-sound.mp3'); // Replace with the relative path to your sound file
  warningSound.play();
}

function showBSOD() {
  document.body.innerHTML = `
    <div style="color: white; background: blue; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; font-family: monospace; font-size: 20px;">
      <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
      <p>If this is the first time you've seen this stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
      <p>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>
      <p>Technical information:</p>
      <p>*** STOP: 0x0000007B (0xFFFFF880009A9928, 0xFFFFFFFFC0000034, 0x0000000000000000, 0x0000000000000000)</p>
    </div>
  `;
}

function updateTimer() {
  timerElement.textContent = seconds;
  if (seconds > 0) {
    seconds--;
    setTimeout(updateTimer, 1000);
  } else {
    playCreepyVoice(); // Play creepy voice
    document.body.classList.add('locked'); // Add red flashing background
    document.getElementById('countdown').textContent = "SYSTEM OVERRIDE";
    document.getElementById('countdown').classList.add('blink');
  }
}

// Button interactions
document.addEventListener('DOMContentLoaded', () => {
  const backgroundSound = new Audio('https://freesound.org/data/previews/459/459145_8386271-lq.mp3'); // Replace with a creepy sound URL
  backgroundSound.loop = true;
  backgroundSound.volume = 0.3; // Adjust volume
  backgroundSound.play();

  document.getElementById('fix-btn').addEventListener('click', function() {
    playWarningSound(); // Play the warning sound
    document.getElementById('initial-buttons').classList.add('hidden');
    document.getElementById('password-section').classList.remove('hidden');
  });
});

let attempts = 3;

document.getElementById('submit-password').addEventListener('click', function () {
  if (attempts > 0) {
    attempts--;
    document.getElementById('attempts').textContent = `Attempts remaining: ${attempts}`;

    if (attempts === 0) {
      document.getElementById('attempts').textContent = "No attempts remaining!";
      document.getElementById('password-input').disabled = true;
      document.getElementById('submit-password').disabled = true;

      // Simulate a frozen system and show the close button
      freezeSystem();
    }
  }

  // Play wrong password sound
  const wrongSound = new Audio('warning-sound.mp3'); // Replace with your sound file
  wrongSound.play();
});

function flickerScreen() {
  const flicker = Math.random() > 0.8; // 20% chance to flicker
  if (flicker) {
    document.body.style.opacity = '0.5';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  }
  setTimeout(flickerScreen, 500); // Repeat every 500ms
}

function displayScaryMessages() {
  const messages = [
    "You have been hacked!",
    "Hacking your system...",
    "System override in progress...",
    "Critical error detected!",
    "Unauthorized access detected!",
    "Your data is no longer safe."
  ];

  const messageElement = document.getElementById('countdown');
  let messageIndex = 0;

  setInterval(() => {
    messageElement.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length; // Cycle through messages
  }, 3000); // Change message every 3 seconds
}

function showRandomError() {
  const errorMessages = [
    "Critical Error: System Overload",
    "Unauthorized Access Detected",
    "Memory Leak Detected",
    "Hard Drive Failure Imminent",
    "System Resources Exhausted",
    "Unknown Malware Detected",
    "System Integrity Compromised",
    "Data Breach in Progress"
  ];

  const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];

  // Create a system-like modal dialog
  const errorDialog = document.createElement('div');
  errorDialog.style.position = 'fixed';
  errorDialog.style.top = `${Math.random() * 80 + 10}%`; // Random vertical position
  errorDialog.style.left = `${Math.random() * 80 + 10}%`; // Random horizontal position
  errorDialog.style.width = '300px';
  errorDialog.style.padding = '20px';
  errorDialog.style.backgroundColor = '#fff';
  errorDialog.style.color = '#000';
  errorDialog.style.border = '2px solid red';
  errorDialog.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  errorDialog.style.fontFamily = 'Arial, sans-serif';
  errorDialog.style.fontSize = '14px';
  errorDialog.style.zIndex = '1000';

  // Add the error message
  errorDialog.innerHTML = `
    <p style="margin: 0; font-weight: bold;">System Alert</p>
    <p style="margin: 10px 0;">${randomMessage}</p>
    <button style="
      margin-top: 10px;
      padding: 5px 10px;
      background-color: red;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 12px;
    ">OK</button>
  `;

  // Add functionality to close the dialog
  errorDialog.querySelector('button').addEventListener('click', () => {
    errorDialog.remove();
  });

  // Append the dialog to the body
  document.body.appendChild(errorDialog);
}

// Trigger random errors every 10 seconds
setInterval(showRandomError, 10000);

function freezeSystem() {
  document.body.innerHTML = `
    <div style="color: white; background: black; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; font-family: monospace; font-size: 20px;">
      <p style="color: red; font-size: 30px;">SYSTEM LOCKED</p>
      <p style="color: white;">Your system has been compromised. Please contact support.</p>
      <button id="close-app" style="
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 18px;
        background: linear-gradient(to bottom, #ff4d4d, #cc0000);
        color: white;
        border: 1px solid #990000;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0 4px #660000;
      ">
        Close
      </button>
    </div>
  `;

  // Play a looping warning sound
  const warningSound = new Audio('warning-sound.mp3'); // Replace with your sound file
  warningSound.loop = true;
  warningSound.play();

  // Add event listener to the close button
  let clickCount = 0;
  document.getElementById('close-app').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 3) {
      window.electronAPI.exitApp(); // Trigger the exit event after 3 clicks
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  flickerScreen(); // Start flickering
  displayScaryMessages(); // Start displaying scary messages
});
document.getElementById('exit-btn').addEventListener('click', () => {
  window.electronAPI.exitApp(); // Trigger the exit event
});