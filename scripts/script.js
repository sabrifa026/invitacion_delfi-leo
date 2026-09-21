// POP UP TARJETA Y MÚSICA DE FONDO
document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enter-btn");
  const bienvenidaOverlay = document.getElementById("bienvenida-overlay");
  const backgroundAudio = document.getElementById("background-audio");

  if (enterBtn && bienvenidaOverlay) {
    enterBtn.addEventListener("click", () => {
      // 1. Ocultamos la tarjeta de bienvenida
      bienvenidaOverlay.classList.add("hidden");

      // 2. Reproducimos el audio de fondo automáticamente
      if (backgroundAudio) {
        backgroundAudio.volume = 0.5; // Volumen al 50% (opcional, para que no suene fuerte de golpe)
        backgroundAudio.play().catch(error => {
          console.log("El navegador impidió la reproducción automática:", error);
        });
      }
    });
  }
});

// CUENTA REGRESIVA
const targetDate = new Date("2026-11-22T18:00:00-03:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    if (typeof timerInterval !== 'undefined') clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.innerText = days;
  if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
  if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
  if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
}

updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);


// RSVP (Sin alertas nativas, muestra un mensaje integrado)
const rsvpForm = document.getElementById('rsvpForm');
const submitBtn = document.getElementById('submitBtn');
const scriptURL = 'https://script.google.com/macros/s/AKfycbzfcrTOskR-Fe9ja6qfDl158mBU5ANE-ydQydU3GtkeA0H4EM33XaQefwPLu3hBrxGZQA/exec';

if (rsvpForm) {
  rsvpForm.addEventListener('submit', e => {
    e.preventDefault();
    
    submitBtn.innerText = "ENVIANDO...";
    submitBtn.disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(rsvpForm), mode: 'no-cors'})
      .then(() => {
        rsvpHacerExito(); // Llama a la función que muestra el texto lindo
      })
      .catch(error => {
        console.error('Error!', error);
        alert("Hubo un error al enviar. Intentá de nuevo.");
        submitBtn.innerText = "GUARDAR RESPUESTA";
        submitBtn.disabled = false;
      });
  });
}

function rsvpHacerExito() {
  rsvpForm.reset();
  submitBtn.innerText = "¡ENVIADO CON ÉXITO! 🎉";
  submitBtn.style.backgroundColor = "#baa577"; // Un color verde sutil de éxito (podes adaptarlo a tu paleta)
  submitBtn.style.color = "#fff";
  
  // Opcional: deshabilita el botón permanentemente para que no envíen doble
  submitBtn.disabled = true; 
}


// COPY ALIAS
function copyAlias(btnElement) {
  const textToCopy = document.getElementById('aliasText').innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = btnElement.innerText;
    btnElement.innerText = "¡COPIADO!";
    btnElement.classList.add('copied');

    setTimeout(() => {
      btnElement.innerText = originalText;
      btnElement.classList.remove('copied');
    }, 1800);
  }).catch(err => {
    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    btnElement.innerText = "¡COPIADO!";
    btnElement.classList.add('copied');

    setTimeout(() => {
      btnElement.innerText = "COPIAR";
      btnElement.classList.remove('copied');
    }, 1800);
  });
}