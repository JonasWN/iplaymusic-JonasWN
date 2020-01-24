import request from "/assets/js/postModule.js";
import lazyLoad from "/assets/js/lazyLoad.js";
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
<<<<<<< HEAD


          // foreach categorys playlist / add that playlist to an <li> / Add that <li> to the categorys <ul>
          playListItems.forEach(item => {
<<<<<<< HEAD

=======

          // foreach categorys playlist / add that playlist to an <li> / Add that <li> to the categorys <ul>
          playListItems.forEach(item => {
>>>>>>> 889eca45415b8352bf3f43cb8a2131251c7b2920
=======
>>>>>>> parent of b1a7496... categories done
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
<<<<<<< HEAD
<<<<<<< HEAD


        } catch (error) {
          console.error(error);
        }

=======
        } catch (error) {
          console.error(error);
        }
>>>>>>> 889eca45415b8352bf3f43cb8a2131251c7b2920
=======
        } catch (error) {
          console.error(error);
        }
>>>>>>> parent of b1a7496... categories done
      };

      // Ivokes the 2nd fetch for playlists
      getPlaylist();
    });
    const targets = document.querySelectorAll("img");
    targets.forEach(lazyLoad);
  } catch (error) {
    // Callbacks if Token has run out
    console.log(error);
    request();
    answer();
    getPlaylist();
  }
};


// document.querySelector(".nav__search").addEventListener("keydown", async () => {
//   let search = document.querySelector(".nav__search input").value
//   console.log(search)
//   try {
//     let refreshToken = sessionStorage.getItem("refresh");
//     const data = await fetch(
//       `https://api.spotify.com/v1/search?q=${search}&type=track%2Cartist%2Calbum%2Cplaylist`, // Fetch Wanted Data
//       {
//         method: "GET",
//         headers: {
//           Authorization: "Bearer " + refreshToken
//         },
//         json: true
//       }
//     );

//     const result = await data.json();
//     console.log(result);
//   } catch {

//   }
// })



answer();