import request from "/assets/js/postModule.js";
import lazyLoad from "/assets/js/lazyLoad.js";

const searchIcon = document.querySelector("#searchIcon");
const searchField = document.querySelector(".nav__search input");
const searchItemsContainer = document.querySelector("#searchContainer");
const overlayContainer = document.querySelector("#overlay");
const overlayTemplate = document.querySelector("#searchItems");
const footer = document.querySelector("footer");

searchIcon.addEventListener("click", () => {
  searchField.value = null;
  searchIcon.classList.toggle("jello-diagonal-1");
  searchField.classList.toggle("scale-in-hor-right");
  searchField.focus();

  if (getComputedStyle(searchField, null).display == "block") {
    footer.style.display = "none";
    console.log("hey");
  } else {
    footer.style.display = "block";
  }

  while (searchItemsContainer.firstChild) {
    searchItemsContainer.removeChild(searchItemsContainer.firstChild);
  }

  overlayContainer.style.display = "none";
  searchItemsContainer.style.display = "none";

  if (document.querySelector(".index__Main")) {
    document.querySelector("main").style.display = "grid";
  } else {
    document.querySelector("main").style.display = "block";
  }
});
console.log();

document.querySelector("body").addEventListener("click", e => {
  if (
    searchItemsContainer.contains(document.querySelector(".searchItem")) ==
    false
  ) {
    if (e.target !== searchIcon && e.target !== searchField) {
      searchIcon.classList.remove("jello-diagonal-1");
      searchField.classList.remove("scale-in-hor-right");

      if (getComputedStyle(searchField, null).display == "block") {
        footer.style.display = "none";
        console.log("hey");
      } else {
        footer.style.display = "block";
      }
    }
  }
});

document
  .querySelector(".nav__search input")
  .addEventListener("input", async e => {
    let search = document.querySelector(".nav__search input").value;
    console.log(search);
    try {
      let refreshToken = sessionStorage.getItem("refresh");
      const data = await fetch(
        `https://api.spotify.com/v1/search?q=${search}&type=track&limit=10&country=DK`, // Fetch Wanted Data
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
        overlayContainer.style.display = "none";
        searchItemsContainer.style.display = "none";
        document.querySelector("main").style.display = "grid";
        if (document.querySelector(".title__vectorGraphic")) {
          document.querySelector(".title__vectorGraphic").style.display =
            "block";
        }
      } else {
        overlayContainer.style.display = "block";
        searchItemsContainer.style.display = "block";
        document.querySelector("main").style.display = "none";
        document.querySelector("footer").style.display = "none";
        if (document.querySelector(".title__vectorGraphic")) {
          document.querySelector(".title__vectorGraphic").style.display =
            "none";
        }
      }

      while (searchItemsContainer.firstChild) {
        searchItemsContainer.removeChild(searchItemsContainer.firstChild);
      }

      for (const key in result) {
        result[key].items.forEach(item => {
          let nameString = item.name;
          let nameStr =
            nameString.slice(0, 12) + (nameString.length > 15 ? "..." : "");

          if (item.type == "track" && item.preview_url) {
            let searchClone = overlayTemplate.content.cloneNode(true);
            searchClone
              .querySelector("img")
              .setAttribute("data-lazy", item.album.images[0].url);
            searchClone
              .querySelector("a")
              .setAttribute(
                "href",
                `/playing?name=albums/${item.album.id}&id=${item.id}`
              );
            searchClone
              .querySelector(".searchItem__nameLink")
              .setAttribute(
                "href",
                `/playing?name=albums/${item.album.id}&id=${item.id}`
              );
            searchClone.querySelector("h4").textContent = nameStr;
            searchClone.querySelector("p").textContent = item.type;
            searchClone.querySelector("h5").textContent = item.artists[0].name;
            searchItemsContainer.appendChild(searchClone);
          }
          // else if (item.type == "playlist") {
          //   let searchClone = overlayTemplate.content.cloneNode(true);
          //   searchClone
          //     .querySelector("img")
          //     .setAttribute("data-lazy", item.images[0].url);
          //   searchClone
          //     .querySelector("a")
          //     .setAttribute(
          //       "href",
          //       `/playlist?name=featured-playlists&id=${item.id}`
          //     );
          //   searchClone
          //     .querySelector(".searchItem__nameLink")
          //     .setAttribute(
          //       "href",
          //       `/playing?name=albums/${item.id}&id=${item.id}`
          //     );
          //   searchClone.querySelector("h4").textContent = nameStr;
          //   searchClone.querySelector("p").textContent = item.type;
          //   searchItemsContainer.appendChild(searchClone);
          // }

          console.log(item);
        });
      }

      const targets = document.querySelectorAll("img");
      targets.forEach(lazyLoad);
    } catch (error) {
      console.log(error);
    }
  });
