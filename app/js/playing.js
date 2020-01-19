const playButton = document.querySelector("#footer__playButton");
// const circles = document.querySelectorAll(".circles__waves");

const sliderback = document.querySelector("#myRange");

const backwards = document.querySelectorAll(".backwards");
const forwards = document.querySelectorAll(".forwards");

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
      sliderback.value -= 10;
      console.log(sliderback.value);
    } else {
      if (sliderback.value == 0) {
        // skip to previous song
        console.log("skip to previous song");
      }
      sliderback.value = 0;
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
      sliderback.value += 10;
      console.log(sliderback.value);
    } else {
      // skip to next song
      console.log("skip to next song");
    }
  });
});
