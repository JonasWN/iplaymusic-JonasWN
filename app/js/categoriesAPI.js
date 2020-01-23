import request from "/assets/js/postModule.js";

const template = document.querySelector("#details__template");
const main = document.querySelector(".main__categories");
const playlists = document.querySelector("#details__playlists");

const detailColors = [
  "#FF1168",
  "##E54028",
  "#F18D05",
  "#F2BC06",
  "#5EB11C",
  "#3A7634",
  "#0ABEBE",
  "#00A1CB",
  "#115793"
];

// GET Categories
const answer = async () => {
  try {
    let refreshToken = sessionStorage.getItem("refresh");
    const data = await fetch(
      `https://api.spotify.com/v1/browse/categories`, // Fetch Wanted Data
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
    let categoriesList = result.categories.items;

    // forEach category / create a summary
    categoriesList.forEach(genre => {
      const ColorGenerator = Math.floor(Math.random() * detailColors.length);

      let productClone = template.content.cloneNode(true);
      productClone.querySelector("summary").textContent = genre.name;
      productClone.querySelector("summary").style.background =
        detailColors[ColorGenerator];
      productClone.querySelector(".summary__list").classList.add(genre.id);
      main.appendChild(productClone);

      // forEach category / fetch that category¨s playlists
      const getPlaylist = async () => {
        try {
          const playListData = await fetch(
            `https://api.spotify.com/v1/browse/categories/${genre.id}/playlists`, // Fetch Wanted Data
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + refreshToken
              },
              json: true
            }
          );

          const fetchedPlaylists = await playListData.json();
          let playListItems = fetchedPlaylists.playlists.items;

          // foreach categorys playlist / add that playlist to an <li> / Add that <li> to the categorys <ul>
          playListItems.forEach(item => {
            let playlistClone = playlists.content.cloneNode(true);
            playlistClone.querySelector("p").textContent = item.name;
            playlistClone
              .querySelector("a")
              .setAttribute("href", `/playlist?id=${item.id}`);
            playlistClone
              .querySelector("#icon__link")
              .setAttribute("href", `/playlist?id=${item.id}`);
            playlistClone.querySelector("#icon__link path").style.fill =
              detailColors[ColorGenerator];
            document.querySelector(`.${genre.id}`).appendChild(playlistClone);
          });
        } catch (error) {
          console.error(error);
        }
      };

      // Ivokes the 2nd fetch for playlists
      getPlaylist();
    });
  } catch (error) {
    // Callbacks if Token has run out
    console.log(error);
    request();
    answer();
    getPlaylist();
  }
};

answer();
