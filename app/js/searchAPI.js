import request from "/assets/js/postModule.js";
import lazyLoad from "/assets/js/lazyLoad.js";

const searchIcon = document.querySelector("#searchIcon")
const searchField = document.querySelector(".nav__search input")
const searchItemsContainer = document.querySelector("#searchContainer");
const overlayContainer = document.querySelector("#overlay")
const overlayTemplate = document.querySelector("#searchItems")

searchIcon.addEventListener("click", () => {
    searchField.value = null;
    searchIcon.classList.toggle("jello-diagonal-1")
    searchField.classList.toggle("scale-in-hor-right")
    searchField.focus()

    while (searchItemsContainer.firstChild) {
        searchItemsContainer.removeChild(searchItemsContainer.firstChild);
    }

    overlayContainer.style.display = "none"
    searchItemsContainer.style.display = "none"

    document.querySelector("footer").style.display = "block"

    if (document.querySelector(".index__Main")) {
        document.querySelector("main").style.display = "grid"
    } else {
        document.querySelector("main").style.display = "block"
    }
})
console.log()


document.querySelector("body").addEventListener("click", (e) => {
    if (searchItemsContainer.contains(document.querySelector(".searchItem")) == false) {
        if (e.target !== searchIcon && e.target !== searchField) {
            searchIcon.classList.remove("jello-diagonal-1")
            searchField.classList.remove("scale-in-hor-right")
        }
    }
})





document.querySelector(".nav__search input").addEventListener("input", async (e) => {
    let search = document.querySelector(".nav__search input").value
    console.log(search)
    try {
        let refreshToken = sessionStorage.getItem("refresh");
        const data = await fetch(
            `https://api.spotify.com/v1/search?q=${search}&type=track&limit=15&country=DK`, // Fetch Wanted Data
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + refreshToken
                },
                json: true
            }
        );

        const result = await data.json();
        // console.log(result)



        if (search.length < 1) {
            overlayContainer.style.display = "none"
            searchItemsContainer.style.display = "none"
            document.querySelector("main").style.display = "grid"
            document.querySelector("footer").style.display = "block"
        } else {
            overlayContainer.style.display = "block"
            searchItemsContainer.style.display = "block"
            document.querySelector("main").style.display = "none"
            document.querySelector("footer").style.display = "none"
        }

        while (searchItemsContainer.firstChild) {
            searchItemsContainer.removeChild(searchItemsContainer.firstChild);
        }

        for (const key in result) {
            result[key].items.forEach(item => {

                let nameString = item.name;
                let nameStr =
                    nameString.slice(0, 12) +
                    (nameString.length > 15 ? "..." : "");

                let searchClone = overlayTemplate.content.cloneNode(true)
                if (item.type == "track") {
                    searchClone.querySelector("img").setAttribute("data-lazy", item.album.images[0].url)
                    searchClone.querySelector("a").setAttribute("href", `/playing?name=albums/${item.album.id}&id=${item.id}`)
                } else {
                    searchClone.querySelector("img").setAttribute("data-lazy", item.images[0].url)
                }

                searchClone.querySelector("h4").textContent = nameStr
                searchClone.querySelector("p").textContent = item.type


                if (item.type == "album") {
                    searchClone.querySelector("a").setAttribute("href", `/playing?name=albums/${item.album.id}&id=${item.id}`)
                }

                searchItemsContainer.appendChild(searchClone)
                console.log(item)
            })
        }

        const targets = document.querySelectorAll("img");
        targets.forEach(lazyLoad);

    } catch (error) {
        console.log(error)
    }
})