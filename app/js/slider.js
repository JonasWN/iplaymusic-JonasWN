const slider = document.querySelector(".sectionSlider__icon");

const thumb = document.querySelector(".sectionSlider__slider");

function volume() {
  console.log(this.value);
}

thumb.addEventListener("change", volume);
thumb.addEventListener("input", volume);
