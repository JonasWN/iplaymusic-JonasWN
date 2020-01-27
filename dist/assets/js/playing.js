const playButton = document.querySelector("#footer__playButton");
// const circles = document.querySelectorAll(".circles__waves");
const songMin = document.querySelector(".songLength__min");

function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}
const sliderback = document.querySelector("#myRange");
const audioFile = document.querySelector("#myAudio");
const playButtons = document.querySelectorAll(".footerPlayOptions__item");
const backwards = document.querySelectorAll(".backwards");
const forwards = document.querySelectorAll(".forwards");
const audioVisual = document.querySelector(".loaderIcon");

playButton.addEventListener("click", () => {
  document.querySelector(".triangle").classList.toggle("triangle_clicked");
  document.querySelector(".circle").classList.toggle("circle_clicked");

  //   for (let i = 0; i < circles.length; i++) {
  //     circles[i].classList.toggle(`delay-${i}`);
  //   }
});

backwards.forEach(icon => {
  icon.addEventListener("click", () => {
    icon.classList.add("bounce-left");

    setTimeout(() => {
      icon.classList.remove("bounce-left");
    }, 200);
    if (icon == backwards[1]) {
      audioFile.currentTime -= 10;
      sliderback.value -= 10;
      console.log(sliderback.value);
    } else {
      if (sliderback.value == 0) {
        // skip to previous song
        console.log("skip to previous song");
      }
      sliderback.value = 0;
      audioFile.currentTime = 0;
    }
  });
});

forwards.forEach(icon => {
  icon.addEventListener("click", () => {
    icon.classList.add("bounce-right");

    setTimeout(() => {
      icon.classList.remove("bounce-right");
    }, 200);

    if (icon == forwards[0]) {
      sliderback.value++;
      sliderback.value++;
      sliderback.value++;
      sliderback.value++;
      sliderback.value++;
      sliderback.value++;
      sliderback.value++;
      sliderback.value++;
      sliderback.value++;
      sliderback.value++;
      audioFile.currentTime += 10;
      // += 10 dident work
      console.log(sliderback.value);
    } else {
      // skip to next song
      console.log("skip to next song");
    }
  });
});

setInterval(() => {
  let songTime = formatTime(audioFile.currentTime);
  sliderback.value = (audioFile.currentTime / audioFile.duration) * 100;
  // audioFile.currentTime = sliderback.value / audioFile.duration * 100;
  songMin.textContent = songTime;
}, 100);

setTimeout(() => {
  document.querySelector(".songLength__max").textContent = formatTime(
    audioFile.duration
  );
}, 100);

const play = e => {
  console.log(e.target);

  if (!audioFile.paused) {
    audioFile.pause();
    audioVisual.classList.remove("puff-in-center");
  } else {
    audioFile.play();
    audioVisual.classList.add("puff-in-center");
  }
};

// for (let i = 0; i < playButtons.length; i++) {
//   playButtons[i].addEventListener("click", play)
// }

playButton.addEventListener("click", play);
