const toggle = document.querySelector("#themeSwitch");

const switchTheme = e => {

    if (e.target.classList == "darkMode") {
        document.documentElement.setAttribute("data-theme", "light");
        e.target.classList.remove("darkMode");

        toggle.classList.toggle("jello-horizontal");
        localStorage.setItem('theme', 'light');

        console.log("light-mode")
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        e.target.classList.add("darkMode");

        toggle.classList.remove("jello-horizontal");
        toggle.classList.toggle("jello-vertical");
        localStorage.setItem('theme', 'dark');

        console.log("dark-mode")
    }
}

if (toggle) {
    toggle.addEventListener("click", switchTheme, false);

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'light') {
            toggle.checked = true;
        }
    }
}


// icons current color 
// const footerIcons = document.querySelectorAll(".footer__item");


// footerIcons.forEach(icon => {
//     icon.addEventListener("click", () => {
//         icon.classList.add("footer__current");

//         console.log("clicked")
//     })
// })