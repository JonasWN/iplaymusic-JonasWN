const indexClone = document.querySelector("#main__template");
const mainList = document.querySelector(".index__Main");

var client_id = "97436deef1ac414495be09ca5d67c3dc"; // Your client id
var client_secret = "98f9d13a1b374c96bcfd322c29915b40"; // Your secret
var redirect_uri = "http://localhost:8080/callback";

const secret = window.btoa("97436deef1ac414495be09ca5d67c3dc:98f9d13a1b374c96bcfd322c29915b40")

fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      'Authorization': 'Basic ' + secret,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)

    const token = data.access_token;

    fetch("https://api.spotify.com/v1/browse/featured-playlists", {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      })
      .then(get => get.json())
      .then(answer => {

        let featured = answer.playlists.items

        console.log(featured)
        console.log(featured[0].images[0].url)
        featured.forEach(item => {
          let productClone = indexClone.content.cloneNode(true);
          productClone.querySelector(".main__img img").setAttribute("data-lazy", item.images[0].url)
          mainList.appendChild(productClone);
        })
      })
  })