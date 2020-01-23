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
let counter = 0;
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

    //simple way
    // let categoriesList = result.categories.items;
    // const dropDownList = document.querySelectorAll("details summary");

    // for (let i = 0; i < dropDownList.length; i++) {

    //     dropDownList[i].textContent = categoriesList[i].name;
    // }

    let categoriesList = result.categories.items;

    categoriesList.forEach(genre => {
      const ColorGenerator = Math.floor(Math.random() * detailColors.length);
      let productClone = template.content.cloneNode(true);
      productClone.querySelector("summary").textContent = genre.name;
      productClone.querySelector("summary").style.background =
        detailColors[ColorGenerator];
      main.appendChild(productClone);
      counter++;
      console.log(counter);
      const try2 = async () => {
        try {
          const data2 = await fetch(
            `https://api.spotify.com/v1/browse/categories/${genre.id}/playlists`, // Fetch Wanted Data
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + refreshToken
              },
              json: true
            }
          );
          const result2 = await data2.json();
          //   console.log(result2);

          let playlists2 = result2.playlists.items;
          console.log(playlists2);
          let counter = playlists2.length;
          //   console.log(counter);
          const summaryList = document.querySelector(".summary__list");

          //   console.log(summaryList);
          playlists2.forEach(item => {
            let playlistClone = playlists.content.cloneNode(true);
            playlistClone.querySelector("p").textContent = item.name;
            summaryList.appendChild(playlistClone);

            console.log(main.querySelector("ul"));
            main.querySelector("ul").appendChild(playlistClone);
          });
        } catch {}
      };
      try2();
    });
  } catch (error) {
    console.log(error);
    request();
    answer();
  }
};

answer();
