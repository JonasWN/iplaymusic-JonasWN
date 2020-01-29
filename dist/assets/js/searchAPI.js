const searchIcon = document.querySelector("#searchIcon")
const searchField = document.querySelector(".nav__search input")


searchIcon.addEventListener("click", () => {
    searchField.value = null;
    searchIcon.classList.toggle("jello-diagonal-1")
    searchField.classList.toggle("scale-in-hor-right")
    searchField.focus()
})

document.querySelector("body").addEventListener("click", (e) => {
    if (e.target !== searchIcon && e.target !== searchField) {
        searchIcon.classList.remove("jello-diagonal-1")
        searchField.classList.remove("scale-in-hor-right")
    }
})