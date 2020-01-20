const toggle = document.querySelector("#themeSwitch");

const switchTheme = e => {
  const themedata = localStorage.getItem("theme");

  if (themedata == "dark") {
    document.documentElement.setAttribute("data-theme", "light");

<<<<<<< HEAD
        // toggle.classList.toggle("jello-horizontal");
        localStorage.setItem('theme', 'light');
=======
    toggle.classList.remove("darkMode");
>>>>>>> 65ea37a1821a6c776f3fa6686f2f71405bbab858

    localStorage.setItem("theme", "light");

<<<<<<< HEAD
        // toggle.classList.remove("jello-horizontal");
        // toggle.classList.toggle("jello-vertical");
        localStorage.setItem('theme', 'dark');
=======
    toggle.classList.add("jello-horizontal");
>>>>>>> 65ea37a1821a6c776f3fa6686f2f71405bbab858

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
