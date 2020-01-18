const playButton = document.querySelector("#footer__playButton");
// const circles = document.querySelectorAll(".circles__waves");

playButton.addEventListener("click", () => {
  document.querySelector(".triangle").classList.toggle("triangle_clicked");
  document.querySelector(".circle").classList.toggle("circle_clicked");

  //   for (let i = 0; i < circles.length; i++) {
  //     circles[i].classList.toggle(`delay-${i}`);
  //   }
});
