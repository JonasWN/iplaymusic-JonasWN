import request from "/assets/js/postModule.js";
import lazyLoad from "/assets/js/lazyLoad.js";


const main = document.querySelector(".main__songsList");
const mainClone = document.querySelector("#mainTemplate");
const paramsID = new URLSearchParams(window.location.search);
const id = paramsID.get("id");

function millisToMinutesAndSeconds(millis) {
  // millis to min / seconds
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60 ?
    minutes + 1 + ":00" :
    minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// GET Data
const answer = async () => {
  try {
    let refreshToken = sessionStorage.getItem("refresh");
    const data = await fetch(
      `https://api.spotify.com/v1/playlists/${id}`, // Fetch Wanted Data
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

    document
      .querySelector(".playlist__galleryitem img")
      .setAttribute("data-lazy", result.images[0].url);

    document.querySelector(".main__title_playlist").textContent =
      result.name;

    const tracks = result.tracks.items;

    //foreach item
    tracks.forEach(item => {
      let productClone = mainClone.content.cloneNode(true);
      productClone
        .querySelector("a")
        .setAttribute("href", `/playing?id=${item.track.id}`);
      productClone
        .querySelector(".main__thumb")
        .setAttribute("data-lazy", item.track.album.images[0].url);

      let nameString = item.track.name;
      let name =
        nameString.slice(0, 12) + (nameString.length > 15 ? "..." : "");

      productClone.querySelector(".main__itemHeader").textContent = name;

      productClone.querySelector(".main__itemText").textContent =
        item.track.artists[0].name;
      productClone.querySelector(
        ".main__songCount"
      ).textContent = millisToMinutesAndSeconds(item.track.duration_ms);
      main.appendChild(productClone);
    });
    const targets = document.querySelectorAll("img");
    targets.forEach(lazyLoad);

  } catch (error) {
    console.error(error);
    request();
    answer();
  }
};

answer();