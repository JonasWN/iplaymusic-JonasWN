import request from "/assets/js/postModule.js";

const indexClone = document.querySelector("#main__template");
const mainList = document.querySelector(".index__Main");
const targets = document.querySelectorAll("img");
// GET Data
const answer = async () => {

  try {

    let refreshToken = sessionStorage.getItem("refresh")
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
    console.log(result)


    if (result.playlists.items) {
      const featuredList = result.playlists.items;
      featuredList.forEach(item => {
        let productClone = indexClone.content.cloneNode(true);
        productClone
          .querySelector("a")
          .setAttribute(
            "href",
            `/playlist?id=${item.id}&theme=_ionicons_svg_ios-microphone`
          );
        productClone
          .querySelector(".main__img img")
          .setAttribute("data-lazy", item.images[0].url);
        mainList.appendChild(productClone);
      });
    }

  } catch (error) {
    request()
    answer();
  }
}

answer();

export default request;