import request from "/assets/js/postModule.js";
import lazyLoad from "/assets/js/lazyLoad.js";
const indexClone = document.querySelector("#main__template");
const mainList = document.querySelector(".index__Main");

// GET Data

const answer = async () => {
  try {
    let refreshToken = sessionStorage.getItem("refresh");
    const data = await fetch(
      "https://api.spotify.com/v1/browse/featured-playlists", // Fetch Wanted Data
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + refreshToken
        },
        json: true
      }
    );

    const result = await data.json();
    console.log(result);

    if (result.playlists.items) {
      const featuredList = result.playlists.items;
      featuredList.forEach(item => {
        let productClone = indexClone.content.cloneNode(true);
        productClone
          .querySelector("a")
          .setAttribute(
            "href",
            `/playlist?name=featured-playlists&id=${
              item.id
            }&position=${featuredList.indexOf(
              item
            )}&theme=_ionicons_svg_ios-microphone`
          );
        productClone
          .querySelector(".main__img img")
          .setAttribute("data-lazy", item.images[0].url);
        mainList.appendChild(productClone);
        console.log(featuredList.indexOf(item));
      });
    }
    document.querySelector(".loader").style.display = "none";
    const targets = document.querySelectorAll("img");
    targets.forEach(lazyLoad);
  } catch (error) {
    request();
    answer();
  }
};

answer();

export default request;





const overlayContainer = document.querySelector("#overlay")
const overlayTemplate = document.querySelector("#searchItems")
const searchItemsContainer = document.querySelector("#searchContainer");

document.querySelector(".nav__search input").addEventListener("input", async (e) => {
  let search = document.querySelector(".nav__search input").value
  console.log(search)
  try {
    let refreshToken = sessionStorage.getItem("refresh");
    const data = await fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=artist%2Calbum%2Cplaylist&limit=3&country=DK`, // Fetch Wanted Data
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
    } else {
      overlayContainer.style.display = "block"
      searchItemsContainer.style.display = "block"
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
        searchClone.querySelector("img").setAttribute("data-lazy", item.images[0].url)
        searchClone.querySelector("h4").textContent = nameStr
        searchClone.querySelector("p").textContent = item.type
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