const toggle = document.querySelector("#themeSwitch");

const switchTheme = e => {

    if (e.target.classList == "darkMode") {
        document.documentElement.setAttribute("data-theme", "light");
        e.target.classList.remove("darkMode");
        localStorage.setItem('theme', 'light');

        console.log("light-mode")
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        e.target.classList.add("darkMode");
        localStorage.setItem('theme', 'dark');

        console.log("dark-mode")
    }
}

toggle.addEventListener("click", switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'light') {
        toggle.checked = true;
    }
}