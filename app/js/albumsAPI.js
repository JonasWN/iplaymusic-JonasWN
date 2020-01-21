const main = document.querySelector(".main__list");
const mainClone = document.querySelector("#new__album");
const featuredTemplate = document.querySelector("#featured__album");
const gallery = document.querySelector(".gallery__list");

const paramsID = new URLSearchParams(window.location.search);
const id = paramsID.get("id");

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
    `https://api.spotify.com/v1/browse/new-releases`, // Fetch Wanted Data
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

  const albums = result.albums.items;

  const featuredAlbums = albums.filter(item => item.album_type == "album");

  console.log(featuredAlbums);

  //feautred albums
  featuredAlbums.forEach(item => {
    let featuredClone = featuredTemplate.content.cloneNode(true);

    featuredClone
      .querySelector("img")
      .setAttribute("data-lazy", item.images[0].url);
    featuredClone
      .querySelector("a")
      .setAttribute("href", `/albumDetails?id=${item.id}`);
    gallery.appendChild(featuredClone);
  });

  // new realease
  albums.forEach(item => {
    let nameString = item.name;
    let name = nameString.slice(0, 12) + (nameString.length > 15 ? "..." : "");

    let productClone = mainClone.content.cloneNode(true);
    productClone
      .querySelector(".main__thumb")
      .setAttribute("data-lazy", item.images[0].url);
    productClone
      .querySelector(".main__item a")
      .setAttribute("href", `/albumDetails?id=${item.id}`);
    productClone.querySelector(".main__itemHeader").textContent = name;
    productClone
      .querySelector(".main__itemHeader")
      .setAttribute("href", `/albumDetails?id=${item.id}`);
    productClone.querySelector(".main__itemText").textContent =
      item.artists[0].name;
    productClone.querySelector(
      ".main__songCount"
    ).textContent = `${item.total_tracks} Songs`;
    main.appendChild(productClone);
  });
};

request();
