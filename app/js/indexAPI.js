const indexClone = document.querySelector("#main__template");
const mainList = document.querySelector(".index__Main");

// fetch("https://accounts.spotify.com/api/token", {
//   method: "POST",
//   headers: {
//     Authorization: "Basic " + secret,
//     "Content-Type": "application/x-www-form-urlencoded"
//   },
//   body: "grant_type=client_credentials"
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);

//     const token = data.access_token;

//     fetch("https://api.spotify.com/v1/browse/featured-playlists", {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + token
//       },
//       json: true
//     })
//       .then(response => response.json())
//       .then(data => {
//         let featured = data.playlists.items;

//         console.log(featured);
//         console.log(featured[0].images[0].url);
//         featured.forEach(item => {
//           let productClone = indexClone.content.cloneNode(true);

//           productClone
//             .querySelector("#featured__playlistLink")
//             .setAttribute("href", `/playlist?playlist-ID=${item.id}`);
//           productClone
//             .querySelector(".main__img img")
//             .setAttribute("data-lazy", item.images[0].url);
//           mainList.appendChild(productClone);
//         });
//       });
//   });

const request = async () => {
  var client_id = "97436deef1ac414495be09ca5d67c3dc"; // Your client id
  var client_secret = "98f9d13a1b374c96bcfd322c29915b40"; // Your secret
  var redirect_uri = "http://localhost:8080/callback";

  const secret = window.btoa(
    "97436deef1ac414495be09ca5d67c3dc:98f9d13a1b374c96bcfd322c29915b40"
  );

  const getToken = await fetch("https://accounts.spotify.com/api/token", {
    // Get Access Token
    method: "POST",
    headers: {
      Authorization: "Basic " + secret,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  const response = await getToken.json();

  const token = response.access_token; // access / refresh token

  const data = await fetch(
    "https://api.spotify.com/v1/browse/featured-playlists", // Fetch Wanted Data
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      },
      json: true
    }
  );

  const result = await data.json();
  console.log(result);

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
};

request();
