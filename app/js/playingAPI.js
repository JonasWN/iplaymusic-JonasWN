import request from "/assets/js/postModule.js";
import lazyLoad from "/assets/js/lazyLoad.js";

const trackCover = document.querySelector("#trackCover");
const mainBackground = document.querySelector("#background");
const main = document.querySelector(".main__playingIcon");
const paramsID = new URLSearchParams(window.location.search);
const name = paramsID.get("name");
const id = paramsID.get("id");
const position = paramsID.get("position");
const title = document.querySelector(".title__heading");
const titleContainer = document.querySelector(".sectionSlider__title");

function millisToMinutesAndSeconds(millis) {
  // millis to min / seconds
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60 ?
    minutes + 1 + ":00" :
    minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const answer = async () => {
  try {
    let refreshToken = sessionStorage.getItem("refresh");
    const data = await fetch(
      `https://api.spotify.com/v1/${name}`, // Fetch Wanted Data
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
    const featuredList = result.tracks.items;
    console.log(featuredList);

    // if you're coming from albums
    if (result.album_type == "single" || result.album_type == "album") {
      console.log("albums");
      featuredList.forEach(item => {
        let sliderItem = trackCover.content.cloneNode(true);
        sliderItem
          .querySelector("img")
          .setAttribute("data-lazy", result.images[0].url);
        sliderItem.querySelector("img").id = `${item.id}`;
        sliderItem.querySelector("img").style.filter =
          "contrast(1.3) saturate(1.3) brightness(1.1)";
        sliderItem.querySelector("img").style.border = "1px solid #000";
        document.querySelector(".carousel").appendChild(sliderItem);
      });
    }
    // if you're coming from playlists
    else {
      console.log("playlists");
      featuredList.forEach(item => {
        let sliderItem = trackCover.content.cloneNode(true);

        sliderItem
          .querySelector("img")
          .setAttribute("data-lazy", item.track.album.images[0].url);
        sliderItem.querySelector("img").id = `${item.track.id}`;
        sliderItem.querySelector("img").style.filter =
          "contrast(1.3) saturate(1.3) brightness(1.1)";
        sliderItem.querySelector("img").style.border = "1px solid #000";
        document.querySelector(".carousel").appendChild(sliderItem);
      });
    }

    var flkty = new Flickity(".carousel", {
      cellAlign: "center",
      contain: true,
      wrapAround: true,
      fade: true,
      on: {
        ready: async function () {
          try {
            const data = await fetch(
              `https://api.spotify.com/v1/tracks/${id}`, // Fetch Wanted Data
              {
                method: "GET",
                headers: {
                  Authorization: "Bearer " + refreshToken
                },
                json: true
              }
            );

            const result = await data.json();
            // console.log(result);
            flkty.selectCell(parseInt(position));

            document.querySelector(".title__heading").textContent = result.name;
            document.querySelector(".title__underTitle").textContent =
              result.artists[0].name;
          } catch (error) {}
        },
        change: async function (index) {
          const currentSelected = document.querySelector(".is-selected img").id;
          console.log(currentSelected);
          console.log("Slide changed to" + index);
          const data = await fetch(
            `https://api.spotify.com/v1/tracks/${currentSelected}`, // Fetch Wanted Data
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + refreshToken
              },
              json: true
            }
          );

          const result = await data.json();
          let nameStr =
            result.name.slice(0, 18) + (result.name.length > 25 ? "..." : "");
          title.textContent = nameStr;
          title.style.animation = "none";
          title.offsetHeight; /* trigger reflow */
          title.style.animation = null;

          let textWrapper = document.querySelector(".title__underTitle");
          textWrapper.textContent = result.artists[0].name;
          textWrapper.style.animation = "none";
          textWrapper.offsetHeight; /* trigger reflow */
          textWrapper.style.animation = null;

        }
      }
    });

    const targets = document.querySelectorAll("img");
    targets.forEach(lazyLoad);
    document.querySelector("main").style.display = "block";
    document.querySelector(".loader").style.display = "none";
  } catch (error) {
    console.error(error);
    request();
    answer();
  }
};

answer();