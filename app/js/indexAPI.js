const indexClone = document.querySelector("#main__template");
const mainList = document.querySelector(".index__Main");

// Exported POST request token
const request = async () => {

  const client_id = "97436deef1ac414495be09ca5d67c3dc"; // Your client id
  const client_secret = "98f9d13a1b374c96bcfd322c29915b40"; // Your secret
  const secret = window.btoa(
    "97436deef1ac414495be09ca5d67c3dc:98f9d13a1b374c96bcfd322c29915b40"
  );

  try {
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
    sessionStorage.setItem("refresh", response.access_token)

  } catch (error) {
    console.error(error)
  }
};

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
  }
}

answer();

export default request;