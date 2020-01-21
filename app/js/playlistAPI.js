const main = document.querySelector(".main__songsList");
const mainClone = document.querySelector("#mainTemplate");

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
    `https://api.spotify.com/v1/playlists/${id}`, // Fetch Wanted Data
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

  document
    .querySelector(".playlist__galleryitem img")
    .setAttribute("data-lazy", result.images[0].url);

  document.querySelector(".main__title_playlist").textContent =
    result.description;

  const tracks = result.tracks.items;

  //foreach item
  tracks.forEach(item => {
    let productClone = mainClone.content.cloneNode(true);
    productClone
      .querySelector("a")
      .setAttribute("href", `/playing?${item.track.id}`);
    productClone
      .querySelector(".main__thumb")
      .setAttribute("data-lazy", item.track.album.images[0].url);

    let nameString = item.track.name;
    let name = nameString.slice(0, 12) + (nameString.length > 15 ? "..." : "");

    productClone.querySelector(".main__itemHeader").textContent = name;

    productClone.querySelector(".main__itemText").textContent =
      item.track.artists[0].name;
    productClone.querySelector(
      ".main__songCount"
    ).textContent = millisToMinutesAndSeconds(item.track.duration_ms);
    main.appendChild(productClone);
  });
};

request();
