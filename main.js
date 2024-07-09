const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const buttons = document.querySelectorAll(".app__card-button");
const startPauseButton = document.querySelector("#start-pause");
const focusMusicInput = document.querySelector("#alternar-musica");
const startOrPauseButton = document.querySelector("#start-pause span");
const startOrPauseIcon = document.querySelector(".app__card-primary-butto-icon");
const timerOnScreen = document.querySelector("#timer");

const music = new Audio("./sons/luna-rise-part-one.mp3");
const playMusic = new Audio("./sons/play.wav");
const pauseMusic = new Audio("./sons/pause.mp3");
const finishTimerMusic = new Audio("./sons/beep.mp3");

let elapsedTimeInSeconds = 1500;
let intervalId = null;

music.music = true;

focusMusicInput.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

function switchContext(context) {
  showTimer();
  buttons.forEach(function (context) {
    context.classList.remove("active");
  });

  html.setAttribute("data-contexto", context);
  banner.setAttribute("src", `./imagens/${context}.png`);

  switch (context) {
    case "foco":
      title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      title.innerHTML = `
            Que tal uma respirada,<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `;
      break;
    case "descanso-longo":
      title.innerHTML = `
                      Hora de voltar à superfície,<br>
                          <strong class="app__title-strong">Faça uma pausa longa.</strong>
                      `;
    default:
      break;
  }
}

focoBt.addEventListener("click", () => {
  elapsedTimeInSeconds = 1500;
  switchContext("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  elapsedTimeInSeconds = 300;
  switchContext("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  elapsedTimeInSeconds = 900;
  switchContext("descanso-longo");
  longoBt.classList.add("active");
});

const countdown = () => {
  if (elapsedTimeInSeconds <= 0) {
    clear();
    finishTimerMusic.play();
    return;
  }
  elapsedTimeInSeconds -= 1;
  showTimer();
};

startPauseButton.addEventListener("click", startOrPause);

function startOrPause() {
  if (intervalId) {
    pauseMusic.play();
    clear();
    return;
  }
  playMusic.play();
  intervalId = setInterval(countdown, 1000);
  startOrPauseButton.textContent = "Pausar";
  startOrPauseIcon.setAttribute("src", "./imagens/pause.png");
}

function clear() {
  clearInterval(intervalId);
  startOrPauseButton.textContent = "Começar";
  startOrPauseIcon.setAttribute("src", "./imagens/play_arrow.png");
  intervalId = null;
}

function showTimer() {
  const timer = new Date(elapsedTimeInSeconds * 1000);
  const formattedTimer = timer.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timerOnScreen.innerHTML = `${formattedTimer}`;
}

showTimer();
