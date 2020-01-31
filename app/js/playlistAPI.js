import request from "/assets/js/postModule.js";
import lazyLoad from "/assets/js/lazyLoad.js";

const main = document.querySelector(".main__songsList");
const mainClone = document.querySelector("#mainTemplate");
const paramsID = new URLSearchParams(window.location.search);
const id = paramsID.get("id");
const name = paramsID.get("name");
const position = paramsID.get("position");

document.querySelector("body").style.height = "125vh";

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
      `https://api.spotify.com/v1/browse/${name}`, // Fetch Wanted Data
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + refreshToken
        },
        json: true
      }
    );
    const sliderTemplate = document.querySelector("#sliderTemplate");
    const caruo = document.querySelector(".carousel");

    const result = await data.json();
    console.log(result);
    const featuredList = result.playlists.items;

    featuredList.forEach(item => {
      let sliderItem = sliderTemplate.content.cloneNode(true);
      sliderItem
        .querySelector("img")
        .setAttribute("data-lazy", item.images[0].url);
      sliderItem.querySelector("img").classList.add(`${item.id}`);
      caruo.appendChild(sliderItem);
    });

    var elem = document.querySelector(".carousel");

    var flkty = new Flickity(elem, {
      // options
      cellAlign: "center",
      contain: true,
      wrapAround: true,
      selectedAttraction: 0.1,
      friction: 0.8,
      on: {
        ready: async function() {
          console.log("Flickity is ready");
          console.log(document.querySelector(".is-selected"));
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

            flkty.selectCell(parseInt(position));

            const tracks = result.tracks.items;
            const previewTracks = tracks.filter(
              song => song.track.preview_url && song.track
            );
            previewTracks.forEach(item => {
              if (item.track) {
                console.log(item.track.preview_url);
                let productClone = mainClone.content.cloneNode(true);
                productClone
                  .querySelector("a")
                  .setAttribute(
                    "href",
                    `/playing?name=playlists/${id}&id=${
                      item.track.id
                    }&position=${previewTracks.indexOf(item)}`
                  );
                console.log(name);
                productClone
                  .querySelector(".main__thumb")
                  .setAttribute("data-lazy", item.track.album.images[0].url);
                let nameString = item.track.name;
                let nameStr =
                  nameString.slice(0, 12) +
                  (nameString.length > 15 ? "..." : "");
                productClone.querySelector(
                  ".main__itemHeader"
                ).textContent = nameStr;
                productClone
                  .querySelector(".item__titleLink")
                  .setAttribute(
                    "href",
                    `/playing?name=playlists/${id}&id=${
                      item.track.id
                    }&position=${previewTracks.indexOf(item)}`
                  );
                productClone.querySelector(".main__itemText").textContent =
                  item.track.artists[0].name;
                productClone.querySelector(
                  ".main__songCount"
                ).textContent = millisToMinutesAndSeconds(
                  item.track.duration_ms
                );
                main.appendChild(productClone);
              }
            });

            document.querySelector(".main__title_playlist").textContent =
              result.name;
            document.querySelector("main").style.display = "block";
            document.querySelector(".loader").style.display = "none";

            const targets = document.querySelectorAll("img");
            targets.forEach(lazyLoad);
          } catch (error) {}
        },
        change: async function(index) {
          document.querySelector("main").style.display = "none";
          document.querySelector(".loader").style.display = "block";
          try {
            let refreshToken = sessionStorage.getItem("refresh");
            const currentSelected = document.querySelector(".is-selected img")
              .className;
            const liRemove = document.querySelectorAll(".main__item");
            for (let i = 0; i < liRemove.length; i++) {
              liRemove[i].remove();
            }

            console.log(currentSelected);
            const data = await fetch(
              `https://api.spotify.com/v1/playlists/${currentSelected}`, // Fetch Wanted Data
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

            document.querySelector(".main__title_playlist").textContent =
              result.name;

            const tracks = result.tracks.items;
            console.log(tracks);
            const previewTracks = tracks.filter(
              song => song.track.preview_url && song.track
            );
            //foreach item
            previewTracks.forEach(item => {
              let productClone = mainClone.content.cloneNode(true);
              productClone
                .querySelector("a")
                .setAttribute(
                  "href",
                  `/playing?name=playlists/${currentSelected}&id=${
                    item.track.id
                  }&position=${previewTracks.indexOf(item)}`
                );
              productClone
                .querySelector(".main__thumb")
                .setAttribute("data-lazy", item.track.album.images[0].url);
              productClone
                .querySelector(".item__titleLink")
                .setAttribute(
                  "href",
                  `/playing?name=playlists/${id}&id=${
                    item.track.id
                  }&position=${previewTracks.indexOf(item)}`
                );
              let nameString = item.track.name;
              let nameStr =
                nameString.slice(0, 12) + (nameString.length > 15 ? "..." : "");
              productClone.querySelector(
                ".main__itemHeader"
              ).textContent = nameStr;
              productClone.querySelector(".main__itemText").textContent =
                item.track.artists[0].name;
              productClone.querySelector(
                ".main__songCount"
              ).textContent = millisToMinutesAndSeconds(item.track.duration_ms);
              main.appendChild(productClone);
            });
            document.querySelector("main").style.display = "block";
            document.querySelector(".loader").style.display = "none";
            const targets = document.querySelectorAll("img");
            targets.forEach(lazyLoad);
          } catch {}

          document.querySelector(".is-selected").style.display = "block";

          document.querySelector("main").style.display = "block";
          document.querySelector(".loader").style.display = "none";
        }
      }
    });
  } catch (error) {
    request();
    answer();
  }
};

answer();
