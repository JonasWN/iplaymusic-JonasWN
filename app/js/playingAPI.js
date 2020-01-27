import request from "/assets/js/postModule.js";
import lazyLoad from "/assets/js/lazyLoad.js";

const mainBackground = document.querySelector("#background")
const main = document.querySelector(".main__playingIcon");
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

const answer = async () => {
  try {
    let refreshToken = sessionStorage.getItem("refresh");
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
    console.log(result);


    let producTemplate = mainBackground.content.cloneNode(true);
    producTemplate.querySelector("img").setAttribute("data-lazy", result.album.images[0].url)
    producTemplate.querySelector("img").style.filter = "contrast(1.3) saturate(1.2)";
    producTemplate.querySelector("img").style.border = "1px solid #000";
    producTemplate.querySelector("img").style.width = "100%"
    producTemplate.querySelector("img").style.height = "100%"
    producTemplate.querySelector("img").style.objectFit = "fill";
    producTemplate.querySelector("img").style.border = "1px solid #000"
    main.appendChild(producTemplate);

    // document.querySelector(
    //   ".songLength__max"
    // ).textContent = millisToMinutesAndSeconds(result.duration_ms);

    document.querySelector(".title__heading").textContent = result.name;
    document.querySelector(".title__underTitle").textContent =
      result.artists[0].name;

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