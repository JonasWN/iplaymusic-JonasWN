import request from "/assets/js/postModule.js";
import lazyLoad from "/assets/js/lazyLoad.js";

const main = document.querySelector(".main__playingIcon");
const paramsID = new URLSearchParams(window.location.search);
const id = paramsID.get("id");

function millisToMinutesAndSeconds(millis) {
  // millis to min / seconds
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
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

    main.style.background = `url(${result.album.images[0].url})`;
    main.style.backgroundPosition = `top`;
    main.style.backgroundRepeat = `no-repeat`;
    main.style.backgroundSize = `contain`;
    main.style.backgroundAttachment = "scroll";
    main.style.borderLeft = "1px solid #000";
    main.style.borderRight = "1px solid #000";

    document.querySelector(
      ".songLength__max"
    ).textContent = millisToMinutesAndSeconds(result.duration_ms);

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
