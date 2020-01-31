const toggle = document.querySelector("#themeSwitch");

const switchTheme = e => {
  const themedata = localStorage.getItem("theme");

  if (themedata == "dark") {
    document.documentElement.setAttribute("data-theme", "light");

    toggle.classList.remove("darkMode");

    localStorage.setItem("theme", "light");

    toggle.classList.add("jello-horizontal");

    setTimeout(() => {
      toggle.classList.remove("jello-horizontal");
    }, 600);

    console.log("light-mode");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");

    toggle.classList.add("darkMode");

    localStorage.setItem("theme", "dark");
    toggle.classList.add("jello-horizontal");
    setTimeout(() => {
      toggle.classList.remove("jello-horizontal");
    }, 600);

    console.log("dark-mode");
  }
};

if (toggle) {
  toggle.addEventListener("click", switchTheme, false);

  const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null;

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "light") {
      toggle.checked = true;
    }
  }
}

const params = new URLSearchParams(window.location.search);
const theme = params.get("theme");
const item = document.querySelector(`#${theme}`);
const wifi = document.querySelector(`.${theme}`);

if (item) {
  item.style.fill = `var(--font-color)`;
}
if (wifi) {
  wifi.style.background = "var(--font-color)";
}

setTimeout(
  (window.onscroll = function() {
    scrollProgress();
  }),
  300
);

function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
